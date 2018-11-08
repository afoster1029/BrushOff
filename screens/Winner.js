import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';

export default class Voting extends React.Component {
  static navigationOptions = {
    title: 'Winner',
  };

  render() {
    const { navigate } = this.props.navigation;
    const winnerUri = this.props.navigation.getParam('winningImage', 'no image');
    const winner = this.props.navigation.getParam('winnerName', 'nothing passed')
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center'}}>Congrats {winner}</Text>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: winnerUri}}
        />
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
