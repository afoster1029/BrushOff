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
      PickerValue : '',
      numPlayers: '',
      p1: '',
      p2: '',
      p3: '',
      p4: '',
      playerNames: [],
      addPlayer: 0,
      test: false,
      testArray: [1,2,3,4,5]
    }
    global.names = this.p1;

    this.getPlayerNames = this.getPlayerNames.bind(this);
  }

  getPlayerNames() {
    return this.state.p1.toString()
  }

  startGame() {
    this.state.playerNames = [this.state.p1,this.state.p2,this.state.p3,this.state.p4];
    this.props.navigation.navigate('Categories', {playerList: this.state.playerNames});
    LobbyScreen.names = this.state.playerNames;
  }

  addItemsToArray() {
    //Alert.alert(this.state.playerNames.toString());
    this.setState({
      playerNames : []
    });
    this.state.playerNames.push( this.state.p1.toString() );
    this.state.playerNames.push( this.state.p2.toString() );
    this.state.playerNames.push( this.state.p3.toString() );
    this.state.playerNames.push( this.state.p4.toString() );

    Alert.alert(this.state.playerNames.toString());
  }


  addPlayerInput() {
    return(
      <View>
        {this.state.testArray.map((prop, key) => {
          return (
            <Text> {prop} </Text>
          );
        })}
      </View>
    )
  }

  showText () {
    this.setState({test:true});
  }

  render() {
    return (
      <View style={{padding: 140}}>
        <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Enter Player Names</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = 'Player 1'

          onChangeText={text0 => this.setState({ p1 : text0 }) }
          //value={this.state.text}
        />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = 'Player 2'
          onChangeText={(text1) => this.setState({p2: text1})}
          //value={this.state.text}
        />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = 'Player 3'
          onChangeText={(text2) => this.setState({p3: text2})}
          //value={this.state.text}
        />

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder = 'Player 4'
          onChangeText={(text3) => this.setState({p4: text3})}
         // value={this.state.text}
        />

        <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{width: 140, height: 50}} >
            <Button
              title="Add Player"
              color="green"
              accessibilityLabel= ""
              onPress={() => { this.showText() }}
            />
            <Button
              title="Start Game"
              color="blue"
              accessibilityLabel="Start the game with the given player names!"
              onPress={() => { this.startGame() }}
            />

          </View>

        </View>


      </View>
    )
  }


}


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
