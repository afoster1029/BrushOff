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
  };

  navigateToWinner(image, playerName) {
    this.props.navigation.navigate('Winner', {winningImage: image, winnerName: playerName})
  }

  render() {
    const playerList = this.props.navigation.getParam('playerList', 'nothing passed');
    const imageUri = this.props.navigation.getParam('images', 'no image');
    var window_height = Dimensions.get('window').height;
    var window_width = Dimensions.get('window').width;
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}>
        <View style={styles.container}>
          <Button
            title="Vote for this drawing"
            color="blue"
            onPress={() => {
              {this.navigateToWinner(imageUri[0], playerList[0])}
            }}
          />
          <Image
            style={{width: window_width, height: window_height}}
            source={{uri: imageUri[0]}}
          />
        </View>

        <View style={styles.container}>
          <Button
            title="Vote for this drawing"
            color="blue"
            onPress={() => {
              {this.navigateToWinner(imageUri[1], playerList[1])}
            }}
          />
          <Image
            style={{width: window_width, height: window_height}}
            source={{uri: imageUri[1]}}
          />
         </View>

         <View style={styles.container}>
           <Button
             title="Vote for this drawing"
             color="blue"
             onPress={() => {
               {this.navigateToWinner(imageUri[2], playerList[2])}
             }}
           />
          <Image
            style={{width: window_width, height: window_height}}
            source={{uri: imageUri[2]}}
          />
         </View>

         <View style={styles.container}>
           <Button
             title="Vote for this drawing"
             color="blue"
             onPress={() => {
               {this.navigateToWinner(imageUri[3], playerList[3])}
             }}
           />
          <Image
            style={{width: window_width, height: window_height}}
            source={{uri: imageUri[3]}}
          />
        </View>
      </Swiper>
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
