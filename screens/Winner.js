import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class Voting extends React.Component {
  static navigationOptions = {
    title: 'Winner',
    header: null,
    gesturesEnabled:false,
  };

  render() {
    const { navigate } = this.props.navigation;
    const winnerUri = this.props.navigation.getParam('winningImage', 'no image');
    const winner = this.props.navigation.getParam('winnerName', 'nothing passed')
    const playerInfo = this.props.navigation.getParam('playerInfo', 'nothing passed');
    console.log('in Winner.js! '+ playerInfo);

    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center'}}>Congrats {winner['name']}</Text>
        <View style = {styles.leaderboard}>
          {playerInfo.map((player, idx)=> (
            <View key = {idx}>
              <Text> player.name + 'has ' + player.score + ' points!'</Text>
            </View>
          ))}
        </View>

        <Button
          title="Next Round"
          onPress={() => {
            this.props.navigation.navigate('Categories', {
            });
          }}
        />
        <Button
          title="Quit"
          onPress={() => {
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
    width: windowWidth - 110,
    height: windowHeight - 200,
    borderRadius: 10,
    marginBottom: 200,
    marginTop: 200,
    borderColor: 'grey',
    borderWidth: 2,
    opacity: .85,
  },
  leaderboard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
