import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';

export default class Voting extends React.Component {
  static navigationOptions = {
    title: 'Voting'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>

            <Button
              title="Picture 1"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Winner', {
                });
              }}
            />
          />
          </View>
          <View style={{width: 65, height: 65, backgroundColor: 'blue'}}>
            <Button
              title="Picture 2"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Winner', {
                });
              }}
            />

          </View>
          <View style={{width: 65, height: 65, backgroundColor: 'green'}}>
            <Button
              title="Picture 3"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Winner', {
                });
              }}
            />

          </View>
          <View style={{width: 65, height: 65, backgroundColor: 'yellow'}}>
            <Button
              title="Picture 4"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Winner', {
                });
              }}
            />

          </View>
        </View>
  
    )
  }
}
