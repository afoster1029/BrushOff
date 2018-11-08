import Expo from 'expo';
import { FileSystem } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class Voting extends React.Component {

  static navigationOptions = {
    title: 'Voting',
    cardStyle: {
      backgroundColor: 'transparent',
    },
    transitionConfig: (): Object => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
    }),
  };

  navigateToWinner(image, playerName) {
    this.props.navigation.navigate('Winner', {winningImage: image, winnerName: playerName})
  }

  render() {
    const playerList = this.props.navigation.getParam('playerList', 'nothing passed');
    console.log(playerList[0]);
    const imageUri = this.props.navigation.getParam('images', 'no image');
    return (
      <View style = {styles.container}>
        <TouchableHighlight onPress={() =>
          {this.navigateToWinner(imageUri[0], playerList[0])}}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[0]}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>
          {this.navigateToWinner(imageUri[1], playerList[1])}}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[1]}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>
          {this.navigateToWinner(imageUri[2], playerList[2])}}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[2]}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>
          {this.navigateToWinner(imageUri[3], playerList[3])}}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[3]}}
          />
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
