'use strict';

import React,{
    PropTypes
} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import styles from './style';
import BaseComponent from './BaseComponent';

let componentIndex = 0;
let elementIndex = 0;

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    style: View.propTypes.style,
    selectStyle: View.propTypes.style,
    optionStyle: View.propTypes.style,
    optionTextStyle: Text.propTypes.style,
    sectionStyle: View.propTypes.style,
    sectionTextStyle: Text.propTypes.style,
    cancelStyle: View.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    overlayStyle: View.propTypes.style,
    cancelText: PropTypes.string
};

const defaultProps = {
    data: [],
    onChange: ()=> {},
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel'
};

export default class ModalPicker extends BaseComponent {

    constructor() {

        super();

        this._bind(
            'onChange',
            'open',
            'close',
            'renderChildren'
        );

        this.state = {
            animationType: 'slide',
            modalVisible: false,
            transparent: false,
            labelName: 'label',
            selected: null,
            placeholder: 'Please select a value'
        };
    }

    componentDidMount() {
        this.setState({selected: this.props.initValue, labelName: this.props.labelName, placeholder: this.props.placeholder});
        this.setState({cancelText: this.props.cancelText});
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.initValue != this.props.initValue || nextProps.labelName != this.props.labelName || nextProps.placeholder != this.props.placeholder) {
        this.setState({selected: nextProps.initValue, labelName: this.props.labelName, placeholder: this.props.placeholder});
      }
    }

    onChange(item) {
        this.props.onChange(item);
        this.setState({selected: item});
        this.close();
    }

    close() {
      this.setState({
        modalVisible: false
      });
    }

    open() {
      this.setState({
        modalVisible: true
      });
    }

    renderSection(section, labelName) {
        return (
            <View key={elementIndex++} style={[styles.sectionStyle,this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle,this.props.sectionTextStyle]}>{section[labelName]}</Text>
            </View>
        );
    }

    renderOption(option, labelName) {
        return (
            <TouchableOpacity key={elementIndex++} onPress={()=>this.onChange(option)}>
                <View style={[styles.optionStyle, this.props.optionStyle]}>
                    <Text style={[styles.optionTextStyle,this.props.optionTextStyle]}>{option[labelName]}</Text>
                </View>
            </TouchableOpacity>)
    }

    renderOptionList() {
        if(!(this.props.data && this.props.data.length > 0)){
          return (
            <View></View>
          )
        }
        var options = this.props.data.map((item) => {
            if (item.section) {
                return this.renderSection(item, this.state.labelName);
            } else {
                return this.renderOption(item, this.state.labelName);
            }
        });

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]} key={'modalPicker'+(componentIndex++)}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps>
                        <View style={{paddingHorizontal:10}}>
                            {options}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.close}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text style={[styles.cancelTextStyle,this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>);
    }

    renderChildren() {

        if(this.props.children) {
            return this.props.children;
        }
        return (
            <View style={[styles.selectStyle, this.props.selectStyle]}>
                <Text style={[styles.selectTextStyle, this.props.selectTextStyle]}>{this.state.selected? this.state.selected[this.state.labelName] : this.state.placeholder}</Text>
            </View>
        );
    }

    render() {

        const dp = (
          <Modal transparent={true} ref="modal" visible={this.state.modalVisible} onRequestClose={this.close} animationType={this.state.animationType}>
          {this.renderOptionList()}
          </Modal>
        );

        return (
            <View style={this.props.style}>
                {dp}
                <TouchableOpacity onPress={this.open}>
                    {this.renderChildren()}
                </TouchableOpacity>
            </View>
        );
    }
}

ModalPicker.propTypes = propTypes;
ModalPicker.defaultProps = defaultProps;
