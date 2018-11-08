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
    // FileSystem.getInfoAsync(FileSystem.documentDirectory + 'drawing1.png')
    // .then((info) => console.log(info))
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center'}}>Time is up! {player}s turn</Text>
        <Image
          source={{uri: imageUri}}
        />
        <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <View style={{width: 120, height: 40}} >
            <Button
              title="Next Player"
              color="green"
              accessibilityLabel="Move to the next player's turn!"
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Drawing', {
                });
              }}
            />
          </View>

          <View style={{width: 60, height: 40, backgroundColor: 'red'}} >
            <Button
              title="Quit"
              color="red"
              accessibilityLabel="Stop the game, lose all variables, and return to the main menu."
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

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
