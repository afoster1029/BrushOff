import Expo from 'expo';
import { FileSystem } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Dimensions, Image, Button, Platform, AppState, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper'


export default class Voting extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      height: 200,
      width: 200
    }
  }

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
    console.log();
    var window_height = Dimensions.get('window').height;
    var window_width = Dimensions.get('window').width;
    const image1 = imageUri[0];
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}>
        <View style={styles.container}>

          <TouchableHighlight onPress={() =>
            this.props.navigation.navigate('Winner', {winningImage: imageUri[0]})}
            underlayColor="white">
            <Image
              style={{width: 200, height: 200}}
              source={{uri: imageUri[0]}}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.container}>
          <TouchableHighlight onPress={() =>
            this.props.navigation.navigate('Winner', {winningImage: imageUri[1]})}
            underlayColor="white">
            <Image
              style={{flex: 1,width: window_width, height: window_height}}
              source={{uri: imageUri[1]}}
            />
          </TouchableHighlight>
         </View>
         <View style={styles.container}>
          <TouchableHighlight onPress={() =>
            this.props.navigation.navigate('Winner', {winningImage: imageUri[2]})}
            underlayColor="white">
            <Image
              style={{width: window_width, height: window_height}}
              source={{uri: imageUri[2]}}
            />
          </TouchableHighlight>
         </View>
         <View style={styles.container}>
          <TouchableHighlight onPress={() =>
            this.props.navigation.navigate('Winner', {winningImage: imageUri[3]})}
            underlayColor="white">
            <Image
              style={{width: window_width, height: window_height}}
              source={{uri: imageUri[3]}}
            />
          </TouchableHighlight>
        </View>
      </Swiper>

      /*
      // <View style = {styles.container}>
      //   <TouchableHighlight onPress={() =>
      //     this.props.navigation.navigate('Winner', {winningImage: imageUri[0]})}
      //     underlayColor="white">
      //     <Image
      //       style={{width: 200, height: 200}}
      //       source={{uri: imageUri[0]}}
      //     />
      //   </TouchableHighlight>
      //   <TouchableHighlight onPress={() =>
      //     this.props.navigation.navigate('Winner', {winningImage: imageUri[1]})}
      //     underlayColor="white">
      //     <Image
      //       style={{width: 200, height: 200}}
      //       source={{uri: imageUri[1]}}
      //     />
      //   </TouchableHighlight>
      //   <TouchableHighlight onPress={() =>
      //     this.props.navigation.navigate('Winner', {winningImage: imageUri[2]})}
      //     underlayColor="white">
      //     <Image
      //       style={{width: 200, height: 200}}
      //       source={{uri: imageUri[2]}}
      //     />
      //   </TouchableHighlight>
      //   <TouchableHighlight onPress={() =>
      //     this.props.navigation.navigate('Winner', {winningImage: imageUri[3]})}
      //     underlayColor="white">
      //     <Image
      //       style={{width: 200, height: 200}}
      //       source={{uri: imageUri[3]}}
      //     />
      //   </TouchableHighlight>
      // </View>
      */
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
