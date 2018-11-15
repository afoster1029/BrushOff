import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, TextInput, Picker } from 'react-native';
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
      playerNames: [{'name':''},{'name':''},{'name':''}], // preset to 3 since we need at least 3
      enteredPlayerNames: false,
    }
  }

  checkIfPlayerNamesEntered(){
    {this.state.playerNames.map((playerName, idx)=> (
      if (playerName['name'].trim.length === 0){
        console.log('working')
      }else{
        console.log('not working')
      }
    ))}
  }

  startGame() {
    this.checkIfPlayerNamesEntered();

    if (this.state.enteredPlayerNames) {
      this.props.navigation.navigate('Categories', {playerList: this.state.playerNames});
      LobbyScreen.names = this.state.playerNames;
    }else{
      Alert.alert(
        'Please fill out all the inputs with names',
        '',
        [
          {text: 'Okay', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      )
    }

  }

  handleAddPlayer () {
    this.setState({
      playerNames: this.state.playerNames.concat([{'name': ''}])
    });
  }

  handleRemovePlayer = (idx) => () => {
    this.setState({
      playerNames: this.state.playerNames.filter((s, sidx) => idx !== sidx)
    });

  }

  handlePlayerNameChange = (idx) => (evt) => {
    const newPlayerNames = this.state.playerNames.map((playerName, sidx) => {
      if (idx !== sidx) {
        return playerName;
      }
      return { ...playerName, name: evt };
    });
    this.setState({ playerNames: newPlayerNames });
  }

  render() {

    return (
      <View style={{padding: 140}}>
        <Text style= {{fontSize:20, fontWeight:'bold',textAlign:'center'}}> Enter Player Names</Text>

        {this.state.playerNames.map((playerName, idx)=> (

          <TextInput
            type='text'
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder = {'Player '+idx}
            value = {playerName.name}
            onChangeText={this.handlePlayerNameChange(idx)}
          />


        ))}

        <Button
          title="Add Player"
          color="green"
          accessibilityLabel= ""
          onPress={() => {this.handleAddPlayer()}}
        />


        <Button
          title="Start Game"
          color="blue"
          accessibilityLabel="Start the game with the given player names!"
          onPress={() => { this.startGame() }}
        />
        <Button
          title="Display Player Names"
          color="green"
          accessibilityLabel= ""
          onPress={() => {console.log(this.state.playerNames)}}
        />
      </View>
    )
  }


}

// // 5 conditional text inputs for names
// { this.state.addPlayerCount >= 1 ?
// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   placeholder = 'Player 4'
//   onChangeText={(text3) => this.setState({p3: text2})}
//   //value={this.state.text}
// /> : null
// }
//
// { this.state.addPlayerCount >= 2 ?
// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   placeholder = 'Player 5'
//   onChangeText={(text3) => this.setState({p3: text2})}
//   //value={this.state.text}
// /> : null
// }
//
// { this.state.addPlayerCount >= 3 ?
// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   placeholder = 'Player 6'
//   onChangeText={(text3) => this.setState({p3: text2})}
//   //value={this.state.text}
// /> : null
// }
//
// { this.state.addPlayerCount >= 4 ?
// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   placeholder = 'Player 7'
//   onChangeText={(text3) => this.setState({p3: text2})}
//   //value={this.state.text}
// /> : null
// }
//
// { this.state.addPlayerCount >= 5 ?
// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 1}}
//   placeholder = 'Player 8'
//   onChangeText={(text3) => this.setState({p3: text2})}
//   //value={this.state.text}
// /> : null
// }


/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
