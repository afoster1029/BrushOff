import Expo from 'expo';
import { FileSystem } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, Image, Button, Platform, AppState, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Swiper from 'react-native-swiper'


export default class Voting extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      height: 200,
      width: 200,
      window_height: Dimensions.get('window').height,
      window_width: Dimensions.get('window').width
    }
  }

  static navigationOptions = {
    title: 'Voting',
    headerStyle: {
    backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  navigateToWinner(image, playerName) {
    this.props.navigation.navigate('Winner', {winningImage: image, winnerName: playerName})
  }

  render() {

    const playerList = this.props.navigation.getParam('playerList', 'nothing passed');
    const image1 = imageUri[0];
    return (
      <Swiper
        loop={false}
        showsPagination={true}
        index={0}>

        {imageUri.map((image, idx)=> (
          <View key = {idx}>
            <Image
              style={styles.BorderClass}
              source={{uri: imageUri[idx]}}
            />
            <Button
              style = {styles.button}
              title="Vote for this drawing"
              color="blue"
              onPress={() => {
                {this.navigateToWinner(imageUri[idx], playerList[idx])}
              }}
            />
          </View>

        ))}


      </Swiper>
    )
  }
}

const styles = StyleSheet.create({
  BorderClass:{
    height: Dimensions.get('window').height-100,
    width: Dimensions.get('window').width-10,

    // Set border width.
    borderWidth: 1,

    // Set border color.
    borderColor: '#000000',
  },
  voteButton: {
    width: '100%',
    height: 100,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
