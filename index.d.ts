import React from 'react';
import { ViewStyle, TextStyle, FlatListProps } from 'react-native';

export interface IOption {
  key: React.Key;
  label?: string;
  section?: boolean;
  testID?: string;
  accessibilityLabel?: string;
  component?: React.ReactNode;
  [key:string]: any;
}

type AnimationType = 'none' | 'slide' | 'fade';
type OrientationType = 'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right';
type ListType = 'SCROLLVIEW' | 'FLATLIST';

export type ModalSelectorProps = IModalSelectorProps<IOption>;

interface IModalSelectorProps<TOption> {
  /**
   * Array of objects with a unique key and label to select in the modal
   * Optional component overrides label text
   *
   * Default is `[]`
   */
  data: TOption[],

      /**
   * List to be render inside modal can be Scrollview or Flatlist
   * 
   * Default is `'SCROLLVIEW'`
   */
  listType?: ListType; 
  
  /**
   * Callback function, when the users has selected an option
   *
   * Default is `() => {}`
   */
  onChange?: (option: TOption) => void; 

  /**
   * Callback function, when modal is opening
   *
   * Default is `() => {}`
   */
  onModalOpen?: () => void;

  /**
   * Callback function, when modal is closing
   *
   * Default is `() => {}`
   */
  onModalClose?: (option: TOption) => void;

  /**
   * Extract the key from the data item
   *
   * Default is `(data) => data.key` 
   */
  keyExtractor?: (option: TOption) => React.Key; 

  /**
   * Extract the label from the data item
   *
   * Default is `(data) => data.label`
   */
  labelExtractor?: (option: TOption) => string; 

  /**
   * Extract the component from the data item
   *
   * Default is `(data) => data.component` 
   */
  componentExtractor?: (option: TOption) => React.ReactNode; 

  /**
   * Control open/close state of modal
   *
   * Default is `false`
   */
  visible?: boolean;

  /**
   * Control if modal closes on select
   *
   * Default is `true`
   */
  closeOnChange?: boolean;

  /**
   * Text that is initially shown on the button
   *
   * Default is `'Select me!'`
   */
  initValue?: string;

  /**
   * Text of the cancel button
   *
   * Default is `'cancel'`
   */
  cancelText?: string;

  /**
   * Type of animation to be used to show the modal.
   *
   * Default is `'slide'`
   */
  animationType?: AnimationType;

  /**
   * Style definitions for the root element
   */
  style?: ViewStyle;

  /**
   * Style definitions for the select element (available in default mode only!)
   * NOTE: Due to breaking changes in React Native, RN < 0.39.0 should pass flex:1 explicitly to selectStyle as a prop
   * 
   * Default is `{}`
   */
  selectStyle?: ViewStyle;

  /**
   * Style definitions for the select element (available in default mode only!)
   * 
   * Default is `{}`
   */
  selectTextStyle?: TextStyle;

  /**
   * Style definitions for the option element
   * 
   * Default is `{}`
   */
  optionStyle?: ViewStyle;

  /**
   * Style definitions for the option text element
   * 
   * Default is `{}`
   */
  optionTextStyle?: TextStyle;

  /**
   * Style definitions for the option container element
   * 
   * Default is `{}`
   */
  optionContainerStyle?: ViewStyle;

  /**
   * Style definitions for the section element
   * 
   * Default is `{}`
   */
  sectionStyle?: ViewStyle;

  /**
   * Style definitions for the children container view
   * 
   * Default is `{}`
   */
  childrenContainerStyle?: ViewStyle;

  /**
   * Style definitions for the touchable element
   * 
   * Default is `{}`
   */
  touchableStyle?: ViewStyle;

  /**
   * Opacity for the touchable element on touch
   * 
   * Default is `0.2`
   */
  touchableActiveOpacity?: number;

  /**
   * Style definitions for the select text element
   * 
   * Default is `{}`
   */
  sectionTextStyle?: TextStyle;

  /**
   * Style definitions for the currently selected text element
   * 
   * Default is `{}`
   */
  selectedItemTextStyle?: TextStyle;

  /**
   * Style definitions for the cancel container
   * 
   * Default is `{}`
   */
  cancelContainerStyle?: ViewStyle;

  /**
   * Style definitions for the cancel element
   * 
   * Default is `{}`
   */
  cancelStyle?: ViewStyle;

  /**
   * Style definitions for the cancel text element
   * 
   * Default is `{}`
   */
  cancelTextStyle?: TextStyle;

  /**
   * Style definitions for the overlay background element
   * RN <= 0.41 should override this with pixel value for padding
   * 
   * Default is `{ flex: 1, padding: '5%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)' }`
   */
  overlayStyle?: ViewStyle;

  /**
   * Style definitions for the initValue text element
   * 
   * Default is `{}`
   */
  initValueTextStyle?: TextStyle;

  /**
   * Disables opening of the modal
   * 
   * Default is `false`
   */
  disabled?: boolean;

  /**
   * Orientations the modal supports
   * 
   * Default is `['portrait', 'landscape']`
   */
  supportedOrientations?: OrientationType[];

  /**
   * Passed to underlying ScrollView
   * 
   * Default is `'always'`
   */
  keyboardShouldPersistTaps?: string | boolean;

  /**
   * true makes the modal close when the overlay is pressed
   * 
   * Default is `false`
   */
  backdropPressToClose?: boolean;

  /**
   * true enables accessibility for the open button container
   * Note: if false be sure to define accessibility props directly in the wrapped component
   * 
   * Default is `false`
   */
  openButtonContainerAccessible?: boolean;

  /**
   * true enables accessibility for data items. 
   * Note: data items should have an accessibilityLabel property if this is enabled
   * 
   * Default is `false`
   */
  listItemAccessible?: boolean;

  /**
   * true enables accessibility for cancel button.
   * 
   * Default is `false`
   */
  cancelButtonAccessible?: boolean;

  /**
   * true enables accessibility for the scroll view. 
   * Only enable this if you don't want to interact with individual data items.
   * 
   * Default is `false`
   */
  scrollViewAccessible?: boolean;

  /**
   * Accessibility label for the modal ScrollView
   */
  scrollViewAccessibilityLabel?: string;

  /**
   * Accessibility label for the cancel button 
   */
  cancelButtonAccessibilityLabel?: string;

  /**
   * props to pass through to the container View and each option TouchableOpacity (e.g. testID for testing)
   * 
   * Default is `{}`
   */
  passThruProps?: object;

  /**
   * props to pass through to the select text component
   * 
   * Default is `{}`
   */
  selectTextPassThruProps?: object;

  /**
   * props to pass through to the options text components in the modal
   * 
   * Default is `{}`
   */
  optionTextPassThruProps?: object;

  /**
   * props to pass through to the cancel text components in the modal
   *
   * Default is `{}`
   */
  cancelTextPassThruProps?: object;

  /**
   * props to pass through to the internal ScrollView
   *
   * Default is `{}`
   */
  scrollViewPassThruProps?: object;

  /**
   * How far touch can stray away from touchable that opens modal
   * 
   * Default is `{}`
   */
  modalOpenerHitSlop?: object;

  /**
   * Render a custom node instead of the built-in select box
   */
  customSelector?: React.ReactNode;

  /**
   * Key of the item to be initially selected
   * 
   * Default is `''`
   */
  selectedKey?: React.Key;

  /**
   * enables short press. This is regular touch behavior.
   */
  enableShortPress?: boolean;

  /**
   * enables long press. When true
   */
  enableLongPress?: boolean;

  /**
   * This prefixes each selectable option's testID prop if no testID keys are provided in data array objects. 
   * Default for each option's testID: 'default-<optionLabel>'
   */
  optionsTestIDPrefix?: string;

  /**
   * Render a header above the list
   */
   header?: React.ReactNode;
 
}

type FlatListCustom<T> = Omit<FlatListProps<T>, "renderItem">

export default class ModalSelector<TOption = IOption> extends React.Component<IModalSelectorProps<TOption> & FlatListCustom<any>, any> {
  open: (args0?: {longPress?: boolean, [args1:string]: any})=> void;
  close: (item: TOption) => void;
  getSelectedItem: () => TOption;
}
