import Expo from 'expo';
import { FileSystem } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';


export default class InterPlayer extends React.Component {
  static navigationOptions = {
    title: 'InterPlayer'
  };
  render() {
    const player = this.props.navigation.getParam('nextPlayer', 'nothing passed');
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center'}}>Time is up! {player}s turn</Text>
        <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <View style={{width: 60, height: 80, backgroundColor: 'steelblue'}} >
            <Button
              title="Next Player"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Drawing', {
                });
              }}
            />
          </View>
<<<<<<< HEAD
          <View style={{width: 60, height: 40, backgroundColor: 'red'}} >
            <Button
              title="Quit"
=======

          <View style={{width: 60, height: 40}} >
            <Button
              title="Quit"
              color="blue"
              accessibilityLabel="Stop the game, lose all variables, and return to the main menu."
>>>>>>> eadb608c90eb07b689240a8040bef40f12f5b76e
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
}

<<<<<<< HEAD
=======

>>>>>>> eadb608c90eb07b689240a8040bef40f12f5b76e
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
