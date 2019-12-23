"use strict";

import React from "react";
import PropTypes from "prop-types";
import {
    View,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Platform,
    ViewPropTypes as RNViewPropTypes,
} from "react-native";

import styles from "./style";

const ViewPropTypes = RNViewPropTypes || View.propTypes;

let componentIndex = 0;

const propTypes = {
    data:                   PropTypes.array,
    onChange:               PropTypes.func,
    onModalOpen:            PropTypes.func,
    onModalClose:           PropTypes.func,
    keyExtractor:           PropTypes.func,
    labelExtractor:         PropTypes.func,
    componentExtractor:     PropTypes.func,
    children:               PropTypes.element,
    visible:                PropTypes.bool,
    closeOnChange:          PropTypes.bool,
    initValue:              PropTypes.string,
    animationType:          PropTypes.oneOf(["none", "slide", "fade"]),
    style:                  ViewPropTypes.style,
    selectStyle:            ViewPropTypes.style,
    selectTextStyle:        Text.propTypes.style,
    optionStyle:            ViewPropTypes.style,
    optionTextStyle:        Text.propTypes.style,
    optionContainerStyle:   ViewPropTypes.style,
    sectionStyle:           ViewPropTypes.style,
    childrenContainerStyle: ViewPropTypes.style,
    touchableStyle:         ViewPropTypes.style,
    touchableActiveOpacity: PropTypes.number,
    sectionTextStyle:       Text.propTypes.style,
    selectedItemTextStyle:  Text.propTypes.style,
    finishContainerStyle:   ViewPropTypes.style,
    finishStyle:            ViewPropTypes.style,
    finishTextStyle:        Text.propTypes.style,
    overlayStyle:           ViewPropTypes.style,
    initValueTextStyle:     Text.propTypes.style,
    finishText:             PropTypes.string,
    disabled:               PropTypes.bool,
    supportedOrientations:  PropTypes.arrayOf(
        PropTypes.oneOf([
            "portrait",
            "portrait-upside-down",
            "landscape",
            "landscape-left",
            "landscape-right",
        ])
    ),
    keyboardShouldPersistTaps: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
    ]),
    backdropPressToClose:           PropTypes.bool,
    openButtonContainerAccessible:  PropTypes.bool,
    listItemAccessible:             PropTypes.bool,
    finishButtonAccessible:         PropTypes.bool,
    scrollViewAccessible:           PropTypes.bool,
    scrollViewAccessibilityLabel:   PropTypes.string,
    finishButtonAccessibilityLabel: PropTypes.string,
    passThruProps:                  PropTypes.object,
    selectTextPassThruProps:        PropTypes.object,
    optionTextPassThruProps:        PropTypes.object,
    modalOpenerHitSlop:             PropTypes.object,
    customSelector:                 PropTypes.node,
    initSelectedKeys:               PropTypes.arrayOf(PropTypes.any),
    multiple:                       PropTypes.bool,
    renderCheckbox:                 PropTypes.func,
};

const defaultProps = {
    data:                           [],
    onChange:                       () => {},
    onModalOpen:                    () => {},
    onModalClose:                   () => {},
    keyExtractor:                   item => item.key,
    labelExtractor:                 item => item.label,
    componentExtractor:             item => item.component,
    visible:                        false,
    closeOnChange:                  true,
    initValue:                      "Select me!",
    animationType:                  "slide",
    style:                          {},
    selectStyle:                    {},
    selectTextStyle:                {},
    optionStyle:                    {},
    optionTextStyle:                {},
    optionContainerStyle:           {},
    sectionStyle:                   {},
    childrenContainerStyle:         {},
    touchableStyle:                 {},
    touchableActiveOpacity:         0.2,
    sectionTextStyle:               {},
    selectedItemTextStyle:          {},
    finishContainerStyle:           {},
    finishStyle:                    {},
    finishTextStyle:                {},
    overlayStyle:                   {},
    initValueTextStyle:             {},
    finishText:                     "Done",
    disabled:                       false,
    supportedOrientations:          ["portrait", "landscape"],
    keyboardShouldPersistTaps:      "always",
    backdropPressToClose:           false,
    openButtonContainerAccessible:  false,
    listItemAccessible:             false,
    finishButtonAccessible:         false,
    scrollViewAccessible:           false,
    scrollViewAccessibilityLabel:   undefined,
    finishButtonAccessibilityLabel: undefined,
    passThruProps:                  {},
    selectTextPassThruProps:        {},
    optionTextPassThruProps:        {},
    modalOpenerHitSlop:             { top: 0, bottom: 0, left: 0, right: 0 },
    customSelector:                 undefined,
    initSelectedKeys:               [],
    multiple:                       false,
    renderCheckbox:                 () => {},
};

export default class ModalSelector extends React.Component {
    constructor(props) {
        super(props);
        let validatedKeys = props.initSelectedKeys.reduce((acc, val) => {
            const { key } = this.validateSelectedKey(val);
            key && acc.push(key);
            return acc;
        }, []);
        this.state = {
            modalVisible: props.visible,
            selected:     props.multiple ? validatedKeys : [validatedKeys[0]],
        };
    }

    componentDidUpdate(prevProps) {
        let newState = {};
        let doUpdate = false;
        if (prevProps.initValue !== this.props.initValue) {
            newState.selected = [this.props.initValue];
            doUpdate = true;
        }
        if (prevProps.visible !== this.props.visible) {
            newState.modalVisible = this.props.visible;
            doUpdate = true;
        }
        if (doUpdate) {
            this.setState(newState);
        }
    }

  validateSelectedKey = key => {
      let selectedItem = this.props.data.filter(
          item => this.props.keyExtractor(item) === key
      );
      let selectedLabel =
      selectedItem.length > 0
          ? this.props.labelExtractor(selectedItem[0])
          : this.props.initValue;
      let selectedKey = selectedItem.length > 0 ? key : undefined;
      // Return the item as it is without removing any extra keys that user passes.
      return { ...selectedItem[0], label: selectedLabel, key: selectedKey };
  };

  onChange = (item, checked = false) => {
      let { selected } = this.state;
      const itemKey = this.props.keyExtractor(item);
      const selectedIndex = selected.indexOf(itemKey);
      if (this.props.multiple) {
          checked
              ? selected.push(itemKey)
              : selectedIndex >= 0 && selected.splice(selectedIndex, 1);
      } else {
          selected = [itemKey];
      }
      if (
          Platform.OS === "android" ||
      (Modal.propTypes !== undefined && !Modal.propTypes.onDismiss)
      ) {
      // don't know if this will work for previous version, please check!
      // RN >= 0.50 on iOS comes with the onDismiss prop for Modal which solves RN issue #10471
          this.props.onChange(selected.map(this.validateSelectedKey));
      }
      this.setState({ selected }, () => {
          if (this.props.closeOnChange && !this.props.multiple) this.close();
      });
  };

  getSelectedItems() {
      return this.state.selected.map(this.validateSelectedKey);
  }

  close = () => {
      this.props.onModalClose();
      this.setState({
          modalVisible: false,
      });
  };

  open = () => {
      this.props.onModalOpen();
      this.setState({
          modalVisible: true,
      });
  };

  renderSection = section => {
      const optionComponent = this.props.componentExtractor(section);

      let component = optionComponent || (
          <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
              {this.props.labelExtractor(section)}
          </Text>
      );

      return (
          <View
              key={this.props.keyExtractor(section)}
              style={[styles.sectionStyle, this.props.sectionStyle]}
          >
              {component}
          </View>
      );
  };

  renderOption = (option, isLastItem, isFirstItem) => {
      const optionComponent = this.props.componentExtractor(option);
      const isSelectedItem =
      this.state.selected.indexOf(this.props.keyExtractor(option)) >= 0;
      const optionLabel = this.props.labelExtractor(option);
      let component = optionComponent || (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.props.multiple &&
          this.props.renderCheckbox(isSelectedItem, () =>
              this.onChange(option, !isSelectedItem)
          )}
              <Text
                  style={[
                      styles.optionTextStyle,
                      this.props.optionTextStyle,
                      isSelectedItem && this.props.selectedItemTextStyle,
                  ]}
                  {...this.props.optionTextPassThruProps}
              >
                  {optionLabel}
              </Text>
          </View>
      );

      return (
          <TouchableOpacity
              key={this.props.keyExtractor(option)}
              onPress={() => this.onChange(option, !isSelectedItem)}
              activeOpacity={this.props.touchableActiveOpacity}
              accessible={this.props.listItemAccessible}
              accessibilityLabel={option.accessibilityLabel || undefined}
              importantForAccessibility={isFirstItem}
              {...this.props.passThruProps}
          >
              <View
                  style={[
                      styles.optionStyle,
                      this.props.optionStyle,
                      isLastItem && { borderBottomWidth: 0 },
                  ]}
              >
                  {component}
              </View>
          </TouchableOpacity>
      );
  };

  renderOptionList = () => {
      let options = this.props.data.map((item, index) => {
          if (item.section) {
              return this.renderSection(item);
          }
          return this.renderOption(
              item,
              index === this.props.data.length - 1,
              index === 0
          );
      });

      let Overlay = View;
      let overlayProps = {
          style: { flex: 1 },
      };
      // Some RN versions have a bug here, so making the property opt-in works around this problem
      if (this.props.backdropPressToClose) {
          Overlay = TouchableWithoutFeedback;
          overlayProps = {
              key:        `modalSelector${componentIndex++}`,
              accessible: false,
              onPress:    this.close,
          };
      }

      return (
          <Overlay {...overlayProps}>
              <View style={[styles.overlayStyle, this.props.overlayStyle]}>
                  <View
                      style={[styles.optionContainer, this.props.optionContainerStyle]}
                  >
                      <ScrollView
                          keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
                          accessible={this.props.scrollViewAccessible}
                          accessibilityLabel={this.props.scrollViewAccessibilityLabel}
                      >
                          <View style={{ paddingHorizontal: 10 }}>{options}</View>
                      </ScrollView>
                  </View>
                  <View
                      style={[styles.finishContainer, this.props.finishContainerStyle]}
                  >
                      <TouchableOpacity
                          onPress={this.close}
                          activeOpacity={this.props.touchableActiveOpacity}
                          accessible={this.props.finishButtonAccessible}
                          accessibilityLabel={this.props.finishButtonAccessibilityLabel}
                      >
                          <View style={[styles.finishStyle, this.props.finishStyle]}>
                              <Text
                                  style={[styles.finishTextStyle, this.props.finishTextStyle]}
                              >
                                  {this.props.finishText}
                              </Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
          </Overlay>
      );
  };

  renderChildren = () => {
      if (this.props.children) {
          return this.props.children;
      }
      let initSelectStyle = this.state.selected.find(
          v => v === this.state.initValue
      )
          ? [styles.initValueTextStyle, this.props.initValueTextStyle]
          : [styles.selectTextStyle, this.props.selectTextStyle];
      return (
          <View style={[styles.selectStyle, this.props.selectStyle]}>
              <Text style={initSelectStyle} {...this.props.selectTextPassThruProps}>
                  {this.state.selected
                      .map(key =>
                          this.props.labelExtractor(this.validateSelectedKey(key))
                      )
                      .join()}
              </Text>
          </View>
      );
  };

  render() {
      const dp = (
          <Modal
              transparent={true}
              ref={element => (this.model = element)}
              supportedOrientations={this.props.supportedOrientations}
              visible={this.state.modalVisible}
              onRequestClose={this.close}
              animationType={this.props.animationType}
              multiple={this.props.multiple}
              onDismiss={() =>
                  this.state.selected &&
          this.props.onChange(
              this.props.multiple
                  ? this.state.selected.map(this.validateSelectedKey)
                  : [this.validateSelectedKey(this.state.selected[0])]
          )
              }
          >
              {this.renderOptionList()}
          </Modal>
      );

      return (
          <View style={this.props.style} {...this.props.passThruProps}>
              {dp}
              {this.props.customSelector ? (
                  this.props.customSelector
              ) : (
                  <TouchableOpacity
                      hitSlop={this.props.modalOpenerHitSlop}
                      activeOpacity={this.props.touchableActiveOpacity}
                      style={this.props.touchableStyle}
                      onPress={this.open}
                      disabled={this.props.disabled}
                      accessible={this.props.openButtonContainerAccessible}
                  >
                      <View
                          style={this.props.childrenContainerStyle}
                          pointerEvents="none"
                      >
                          {this.renderChildren()}
                      </View>
                  </TouchableOpacity>
              )}
          </View>
      );
  }
}

ModalSelector.propTypes = propTypes;
ModalSelector.defaultProps = defaultProps;
