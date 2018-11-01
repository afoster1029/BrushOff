import Expo from 'expo';
import { FileSystem } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class Voting extends React.Component {

  static navigationOptions = {
    title: 'Voting'
  };

  render() {
    const imageUri = this.props.navigation.getParam('images', 'no image');
    console.log(imageUri[0]);
    const image1 = imageUri[0];
    return (
      <View style = {styles.container}>
        <TouchableHighlight onPress={() =>
          this.props.navigation.navigate('Winner', {winningImage: imageUri[0]})}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[0]}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>
          this.props.navigation.navigate('Winner', {winningImage: imageUri[1]})}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[1]}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>
          this.props.navigation.navigate('Winner', {winningImage: imageUri[2]})}
          underlayColor="white">
          <Image
            style={{width: 200, height: 200}}
            source={{uri: imageUri[2]}}
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() =>
          this.props.navigation.navigate('Winner', {winningImage: imageUri[3]})}
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
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  
