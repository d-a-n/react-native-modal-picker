'use strict';

import React, {Component} from 'react';

import {View, Text, TextInput, Switch} from 'react-native';
import {CheckBox} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import ModalSelector from 'react-native-modal-selector';

Icon.loadFont();

class SampleApp extends Component {
  constructor() {
    super();
    this.state = {
      textInputValue: '',
    };
  }

  render() {
    let index = 0;
    const data = [
      {key: index++, section: true, label: 'Fruits'},
      {
        key: index++,
        label: 'Red Apples',
        component: (
          <View
            style={{
              backgroundColor: 'red',
              borderRadius: 5,
              alignItems: 'center',
            }}>
            <Text style={{color: 'white'}}>Red Apples custom component ☺</Text>
          </View>
        ),
      },
      {key: index++, label: 'Cherries'},
      {key: index++, label: 'Cranberries'},
      {key: index++, label: 'Pink Grapefruit'},
      {key: index++, label: 'Raspberries'},
      {key: index++, section: true, label: 'Vegetables'},
      {key: index++, label: 'Beets'},
      {key: index++, label: 'Red Peppers'},
      {key: index++, label: 'Radishes'},
      {key: index++, label: 'Radicchio'},
      {key: index++, label: 'Red Onions'},
      {key: index++, label: 'Red Potatoes'},
      {key: index++, label: 'Rhubarb'},
      {key: index++, label: 'Tomatoes'},
    ];

    return (
      <View style={{flex: 1, justifyContent: 'space-around', padding: 50}}>
        {/* Default mode: a clickable button will re rendered */}
        <ModalSelector
          data={data}
          multiple={true}
          renderCheckbox={(checked, onPress) => (
            <CheckBox onPress={onPress} checked={checked} />
          )}
          initValue="Select something yummy!"
          onChange={option => {
            alert(`${JSON.stringify(option)} nom nom nom`);
          }}
        />

        {/*
                    Wrapper mode: just wrap your existing component with ModalSelector.
                    When the user clicks on your element, the modal selector is shown.
                 */}
        <ModalSelector
          data={data}
          initValue="Select something yummy!"
          onChange={option => {
            this.setState({textInputValue: option.label});
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              height: 40,
            }}
            editable={false}
            placeholder="Select something yummy!"
            value={this.state.textInputValue}
          />
        </ModalSelector>

        {/*
                    Custom mode: you have to provide a react-native component that have to
                    control how the selector should open (and for this you need a ref to the modal)
                 */}
        <ModalSelector
          data={data}
          ref={selector => {
            this.selector = selector;
          }}
          customSelector={
            <Switch
              style={{alignSelf: 'center'}}
              onValueChange={() => this.selector.open()}
            />
          }
        />
      </View>
    );
  }
}

export default SampleApp;
