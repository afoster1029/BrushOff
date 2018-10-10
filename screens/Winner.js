import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';

export default class Voting extends React.Component {
  static navigationOptions = {
    title: 'Winner'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center'}}>Congrats p1</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player One</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player Two</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player Three</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player Four</Text>
        <Button
          title="Next Round"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Drawing', {
            });
          }}
        />
        <Button
          title="Return to Menu"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Home', {
            });
          }}
        />
      </View>
    )
  }
