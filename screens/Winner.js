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
        /*Maybe have randomized congrats messages/comments? Like "Looks like p1 is pulling ahead!"
        or something? Too complex? Good for user experience.*/
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player One: x Points</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player Two: y Points</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player Three: z Points</Text>
        <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>Player Four: i Points</Text>
        /*For later: Make the alignment of the Players dynamic based off their points, simple list system,
        need access to profiles and their points values.*/
        <Button
          title="Next Round"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Drawing', {
            });
          }}
        />
        <Button
          title="Quit"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Home', {
            });
          }}
        />
      </View>
    )
  }
}
