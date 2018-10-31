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
  // render() {
  //   const { navigate } = this.props.navigation;
  //   return (
  //     <View style = {styles.container}>
  //       <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
  //         <View style={{width: 65, height: 65, backgroundColor: 'purple'}}
  //           <Button
  //             title="Picture 1"
  //             onPress={() => {
  //               /* 1. Navigate to the Details route with params */
  //               this.props.navigation.navigate('Winner', {
  //               });
  //             }}
  //           />
  //         </View>
  //         <View style={{width: 65, height: 65, backgroundColor: 'blue'}}
  //           <Button
  //             title="Picture 2"
  //             onPress={() => {
  //               /* 1. Navigate to the Details route with params */
  //               this.props.navigation.navigate('Winner', {
  //               });
  //             }}
  //           />
  //         </View>
  //         <View style={{width: 65, height: 65, backgroundColor: 'green'}}
  //           <Button
  //             title="Picture 3"
  //             onPress={() => {
  //               /* 1. Navigate to the Details route with params */
  //               this.props.navigation.navigate('Winner', {
  //               });
  //             }}
  //           />
  //         </View>
  //         <View style={{width: 65, height: 65, backgroundColor: 'yellow'}}
  //           <Button
  //             title="Picture 4"
  //             onPress={() => {
  //               /* 1. Navigate to the Details route with params */
  //               this.props.navigation.navigate('Winner', {
  //               });
  //             }}
  //           />
  //         </View>
  //       </View>
  //     </View>
  //   )
  // }
