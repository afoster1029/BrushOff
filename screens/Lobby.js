import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, TextInput, Picker, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';

/*
This class allows players to enter in player names. The game will only navigate
to this screen at the beginning of each game. Not between each round.
*/

export default class LobbyScreen extends React.Component {
  static navigationOptions = {
    title: 'Lobby',
    gesturesEnabled: true,
  };

  constructor(props) {
    super(props)
    //const { navigate } = this.props.navigation;
    this.state = {
      // this is a default player. Will be used to initialize an additional player.
      emptyPlayer: {'name':'', 'img':'','height': 0,'width':0, 'isJudge': false, 'score': 0, 'key': 0},
      // preset to 3 players since we need at least 3 players for the game.
      playerInfo: [
        {'name':'', 'img':'','height': 0,'width':0, 'isJudge': false, 'score': 0, 'key': 0},
        {'name':'', 'img':'','height': 0,'width':0, 'isJudge': false, 'score': 0, 'key': 1},
        {'name':'', 'img':'', 'isJudge': false, 'score': 0, 'key': 2}],
      enteredPlayerNames: false,
      numPlayerInputs: 3,
    }
  }


  checkIfPlayerNamesEntered(){
    this.state.playerInfo.map((playerName, idx)=> {
      if (playerName['name'].length == 0){
        namesEntered = false;
      }else{
        namesEntered = true;
      }
    })
    return namesEntered
  }

  /*
  Allows the user to move forward in the game. This will navigate the user to
  the categories page. This method makes sure that the user entered in names
  before navigating to categories.
  */
  startGame() {
    const namesEntered = this.checkIfPlayerNamesEntered();

    // This will create the first player name entered to start as the judge.
    // Also passes along the playerInfo to Categories.js.
    if (namesEntered) {
      this.state.playerInfo[0].isJudge = true;
      this.props.navigation.navigate('Categories', {playerInfo: this.state.playerInfo});
      // LobbyScreen.names = this.state.playerInfo;
    }else{
      Alert.alert(
        'Please enter player names.',
        '',
        [{text: 'Ok',
          style: 'cancel'}
       ],{ cancelable: false }
      )
    }
  }

  startWithNoNames() {
    this.state.playerInfo.map((player, idx)=> (
      player.name = 'Player '+parseInt(idx+1)
    ))
    this.state.playerInfo[0].isJudge = true;
    this.props.navigation.navigate('Categories', {playerInfo: this.state.playerInfo});
  }


  goToHomeScreen() {
    // checks if any text was inputted to the TextInputs
    nameEntered = false
    this.state.playerInfo.map((playerName, idx)=> {
      if (playerName['name'].length != 0){
        nameEntered = true;
      }
    })

    if (nameEntered) {
      Alert.alert(
        'Are you sure you want to go back? This will discard any player names entered.',
        '',
        [{text: 'No', style: 'cancel'},
         {text: 'Yes', onPress: () => this.props.navigation.navigate('Home', {name: 'HomeScreen'}),
          style: 'cancel'}
       ],{ cancelable: false }
      )
    } else {
      this.props.navigation.navigate('Home', {name: 'HomeScreen'});
    }
  }


  /*
  Allows players to add an additional TextInput for another player name.
  */
  handleAddPlayer () {
    console.log(this.state.playerInfo.length)
    if (this.state.numPlayerInputs <= 7) {
      newPlayer = this.state.emptyPlayer;
      newPlayer['key'] = this.state.numPlayerInputs;
      this.setState({
        playerInfo: this.state.playerInfo.concat([this.state.emptyPlayer])
      });
      this.setState({
        numPlayerInputs: this.state.numPlayerInputs+1
      })
    }else{
      Alert.alert(
        'Maximum Number of Players',
        '',
        [{text: 'Okay', onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'},], { cancelable: false }
      )
    }
  }

  /*
  Allows user to remove TextInputs. This is necessary b/c in order to start the
  game all TextInputs need to have inputs.
  */
  handleRemovePlayer () {
    if (this.state.numPlayerInputs > 3) {
      const len = this.state.playerInfo.length;
      updatePlayerInfo = this.state.playerInfo.splice(0,len-1);
      this.setState({
        playerInfo: updatePlayerInfo
      });
      this.setState({
        numPlayerInputs: this.state.numPlayerInputs-1
      });
    }else{
      Alert.alert(
        'Minimum Number of Players',
        '',
        [{text: 'Okay', onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'},], { cancelable: false }
      )
    }
  }

  /*
  This updates the name for each player depending on text being entered into
  the TextInput.
  */
  handlePlayerNameChange = (idx) => (evt) => {
    const newPlayerInfo = this.state.playerInfo.map((playerName, sidx) => {
      if (idx !== sidx) {
        return playerName;
      }
      return { ...playerName, name: evt };
    });
    this.setState({ playerInfo: newPlayerInfo });
  }

  render() {
    return (
      <ImageBackground
        source={require('./img/player-names-back.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        {/*
        Maps through the playerInfo and displays a TextInput for each player
        in playerInfo.
        */}
        <View style = {styles.container}>
          <View style={{padding: 60}}>
            <View style={{marginTop:60, width:240}}>
            {this.state.playerInfo.map((playerName, idx)=> (
              <TextInput
                key = {idx}
                type='text'
                style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white',fontSize: 24}}
                placeholder = {'Player '+parseInt(idx+1)}
                value = {playerName.name}
                maxLength = {16}
                onChangeText={this.handlePlayerNameChange(idx)}
              />
            ))}
            </View>
            {/* Buttons that allow player to add/remove players and start game.*/}
            <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style = {{flexDirection: 'row', width:240}}>
                  <View style= {styles.changePlayerButton}>
                    <Button
                      title="Add "
                      color="grey"
                      accessibilityLabel= ""
                      onPress={() => {this.handleAddPlayer()}}
                    />
                  </View>
                  <View style= {styles.changePlayerButton}>
                    <Button
                      title="Remove"
                      color="grey"
                      accessibilityLabel= ""
                      onPress={() => {this.handleRemovePlayer()}}
                    />
                  </View>
                </View>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                <View style= {{borderRadius:10, borderColor: 'grey', borderWidth: 2,backgroundColor: 'white', marginTop: 50,width:120}}>
                  <Button
                    title="Back"
                    color="grey"
                    onPress={() => {this.goToHomeScreen()}}
                  />
                </View>
                <View style= {{borderRadius:10, borderColor: 'grey', borderWidth: 2,backgroundColor: 'white', marginTop: 50,width:120}}>
                  <Button
                    title="Start Game"
                    color="grey"
                    accessibilityLabel= ""
                    onPress={() => {this.startGame()}}
                  />
                </View>

             </View>
            </View>
        </View>
      </ImageBackground>
    )
  }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonImage: {
    resizeMode: 'contain',
    flex: 1,
    width: 140,
    height: 40,
  },
  changePlayerButton: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'white',
    width: 120,
    height:36,
  },
});
