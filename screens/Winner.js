import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, ImageBackground, Dimensions, BackHandler } from 'react-native';

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


  /*
  * Adds +1 to score of winner, iterates to next judge in order
  */
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
    }
  }

  /*
  Method that takes us into a new round, retains all current player information and Score,
  but begins a new drawing round at the categories screen. Switches the judge from last round.
  */
  nextRound() {
    this.props.navigation.navigate('Categories', {playerInfo: this.state.playerInfo});
  }

  /*
  HTML and CSS code for the Winner screen; the base buttons, styling, and images
  to make the screen look how it does.
  */

  /*
  * Following three functions disable android back button
  */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    const { navigate } = this.props.navigation;
    const winnerUri = this.props.navigation.getParam('winningImage', 'no image')
    const winner = this.props.navigation.getParam('winnerName', 'nothing passed')
    const playerInfo = this.state.playerInfo;
    return (
      <ImageBackground
        source={require('./img/paint_splatters.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        <View style = {styles.container}>
          <Text style= {{fontSize: 40, textAlign: 'center', alignSelf: 'center', marginTop:20, color: 'grey'}}>Congrats {winner}</Text>
          <View style={{borderWidth:2, borderColor:'grey', alignSelf: 'center', backgroundColor: 'white'}}>
            <Image
              style={{width: 220, height: 280}}
              source={{uri: winnerUri}}
            />
          </View>
          <View style = {styles.leaderboard}>
            <Text style= {{fontSize: 24, textAlign: 'center', alignSelf: 'center', color: 'grey'}}> Scoreboard </Text>
              <View style={{flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center'}}>
                {playerInfo.map((player, idx)=> (
                  <View key = {idx}>
                    <Text style= {{fontSize: 18, textAlign: 'left', alignSelf: 'center', color: 'grey', marginHorizontal: 5}}>
                      {player.name}: {player.score}
                    </Text>
                  </View>
                ))}
              </View>
          </View>
          <View style= {{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 5}}>
            <View style={styles.button}>
              <Button
                title="Next Round"
                color='grey'
                onPress={() => {
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
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth =  Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius:10,
    borderColor: 'grey',
    borderWidth: 2,
    backgroundColor: 'white',
    width: 145,
  },
  leaderboard: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    // width: windowWidth - 110,
    maxHeight: 120,
    borderRadius: 10,
    paddingBottom: 10,
    marginTop: 15,
    borderColor: 'grey',
    borderWidth: 2,
    opacity: .85,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
