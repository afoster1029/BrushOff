import React, { Component } from 'react';
import { Number, Dimensions, Alert, Button, View, StyleSheet, Text, TextInput, Picker, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';


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
        {'name':'', 'img':'','height': 0,'width':0, 'isJudge': false, 'score': 0, 'key': 2}],
      enteredPlayerNames: false,
      numPlayerInputs: 3,
      windowHeight: Dimensions.get('window').height,
      windowWidth:  Dimensions.get('window').width,
      timerLength: 60,
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
      this.props.navigation.navigate('Categories', {
        playerInfo: this.state.playerInfo,
        timerLength: this.state.timerLength
      });
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
        [{text: 'Okay', onPress: () => null,
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
        [{text: 'Okay', onPress: () => null,
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

  isInteger(x) {
   return x % 1 === 0;
  }

  updateTimerLimit(text){
    if (this.isInteger(parseInt(text,10))){
      this.setState({timerLength: parseInt(text,10)})
    }
  }

  render() {
    return (
      <ImageBackground
        source={require('./img/new-lobby.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        {/*
        Maps through the playerInfo and displays a TextInput for each player
        in playerInfo.
        */}
        <View style = {styles.container}>
          <View style={{padding: 60, flexDirection: 'column', alignItems: 'center'}}>
            <View style={{marginTop:60, width:240, marginTop:this.state.windowHeight*0.15}}>
            {this.state.playerInfo.map((playerName, idx)=> (
              <TextInput
                key = {idx}
                type='text'
                style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white',fontSize: 24, alignSelf: 'center', width: 240}}
                placeholder = {'Player '+parseInt(idx+1)}
                value = {playerName.name}
                maxLength = {12}
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
                <View style = {{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                  <Image
                    style={
                        {
                        resizeMode: 'center',
                        width: this.state.windowWidth*0.95,
                        height: 100,
                        marginBottom:0,
                        marginTop: 50
                        }
                    }
                    source={require('./img/timelimitheader.png')}
                  />

                  <TextInput
                    type='text'
                    style={{width: 50, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white',fontSize: 24}}
                    placeholder = {'60'}
                    maxLength = {3}
                    onChangeText={(text) => this.updateTimerLimit(text)}
                  />

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
