import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, TextInput, Picker, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';

export default class LobbyScreen extends React.Component {
  static navigationOptions = {
    title: 'Lobby'
  };

  constructor(props) {
    super(props)
    //const { navigate } = this.props.navigation;
    this.state = {
      numPlayers: '',
      emptyPlayer: {'name':'', 'img':'', 'isJudge': false, 'score': 0, 'key': 0},
      playerInfo: [
        {'name':'', 'img':'', 'isJudge': false, 'score': 0, 'key': 0},
        {'name':'', 'img':'', 'isJudge': false, 'score': 0, 'key': 1},
        {'name':'', 'img':'', 'isJudge': false, 'score': 0, 'key': 2}], // preset to 3 since we need at least 3
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

  startGame() {
    const namesEntered = this.checkIfPlayerNamesEntered();

    if (namesEntered) {
      this.props.navigation.navigate('Categories', {playerInfo: this.state.playerInfo});
      LobbyScreen.names = this.state.playerInfo;
    }else{
      Alert.alert(
        'Please fill out all the inputs with names',
        '',
        [{text: 'Okay', onPress: () => console.log('Cancel Pressed'),
         style: 'cancel'},],{ cancelable: false }
      )
    }
  }

  handleAddPlayer () {
    console.log(this.state.playerNames.length)
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
        source={require('./img/paint_splatters.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        <View style = {styles.container}>
          <View style={{padding: 60}}>
            <Text style= {{fontSize:20, fontWeight:'bold',textAlign:'center', fontFamily: 'Avenir'}}> Enter Player Names</Text>
            {this.state.playerNames.map((playerName, idx)=> (
              <TextInput
                key = {idx}
                type='text'
                style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white'}}
                placeholder = {'Player '+idx}
                value = {playerName.name}
                onChangeText={this.handlePlayerNameChange(idx)}
              />
            ))}




            <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style = {{flexDirection: 'row'}}>
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
              <View style= {{borderRadius:10, borderColor: 'grey', borderWidth: 2,backgroundColor: 'white', marginTop: 50}}>
                <Button
                  title="Start Game"
                  color="grey"
                  accessibilityLabel= ""
                  onPress={() => {this.startGame()}}
                />
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
    width: 100,
    height:36,
  },
});
