import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';

export default class Voting extends React.Component {
  static navigationOptions = {
    title: 'InterPlayer'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center'}}>Time is up!</Text>
        <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <View style={{width: 60, height: 80, backgroundColor: 'steelblue'}} />
            <Button
              title="Next Player"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Drawing', {
                });
              }}
            />
          </View>
        </View>
        <View style = {{flex: 2, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <View style={{width: 60, height: 40, backgroundColor: 'steelblue'}} />
            <Button
              title="Return to Menu"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Home', {
                });
              }}
            />
          </View>
        </View>
      </View>
    )
  }
