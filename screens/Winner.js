import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class Voting extends React.Component {
  constructor(props) {
    super(props)
    const players = this.props.navigation.getParam('playerInfo', 'nothing passed')
    const winner = this.props.navigation.getParam('winnerName', 'nothing passed')
    this.state = {
      playerInfo: players,
    }
    this.completeRound(winner)
  }
  static navigationOptions = {
    title: 'Winner',
    header: null,
    gesturesEnabled:false,
  };


  //Adds +1 to score of winner, iterates to next judge in order, returns to categories screen
  completeRound(winner) {
    var setJudge = true;
    const playerInfo = this.state.playerInfo;
    for(var i = 0; i < playerInfo.length; i++) {
      if(playerInfo[i].name === winner) {
        playerInfo[i].score++;
      }
      if(playerInfo[i].isJudge && setJudge) {
        playerInfo[i].isJudge = false;
        if(i < playerInfo.length - 1) {
          playerInfo[i + 1].isJudge = true;
        } else {
          playerInfo[0].isJudge = true;
        }
        setJudge = false
      }
      console.log(playerInfo[i].name + ': ' + playerInfo[i].score);
    }
  }

  nextRound() {
    this.props.navigation.navigate('Categories', {playerInfo: this.state.playerInfo});
  }

  render() {
    console.log(this.state.players)
    const { navigate } = this.props.navigation;
    const winnerUri = this.props.navigation.getParam('winningImage', 'no image')
    const winner = this.props.navigation.getParam('winnerName', 'nothing passed')
<<<<<<< HEAD
    const playerInfo = this.props.navigation.getParam('playerInfo', 'nothing passed');
    console.log('in Winner.js! '+ playerInfo);

    return (

      <View style = {styles.container}
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>Congrats {winner['name']}</Text>
=======
    const playerInfo = this.state.playerInfo;
    return (
      <View style = {styles.container}>
        <Text style= {{fontSize: 60, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>Congrats {winner}</Text>
>>>>>>> ca25c3c55b5876bcb37036799344f64f49e21d60
        <View style={{borderWidth:2, borderColor:'black', alignSelf: 'center'}}>
          <View style = {styles.leaderboard}>
            {playerInfo.map((player, idx)=> (
              <View key = {idx}>
                <Text> player.name + 'has ' + player.score + ' points!'</Text>
              </View>
            ))}
          </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
          <View style={styles.button}>
            <Button
              title="Next Round"
              color='grey'
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.nextRound()
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Quit"
              color='grey'
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                this.props.navigation.navigate('Home', {
                });
              }}
            />
          </View>
<<<<<<< HEAD
=======
        </View>
        <Text style= {{fontSize: 24, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}> Scoreboard </Text>
        {playerInfo.map((player, idx)=> (
          <View key = {idx}>
            <Text style= {{fontSize: 18, fontWeight: 'bold', textAlign: 'left', alignSelf: 'center'}}>
              {player.name}: {player.score}
            </Text>
          </View>
        ))}
>>>>>>> ca25c3c55b5876bcb37036799344f64f49e21d60
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
  button: {
    borderRadius:10,
    borderColor: 'grey',
    borderWidth: 2,
    backgroundColor: 'white',
    width: 120,
  }
});
