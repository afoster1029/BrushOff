import React, { Component } from 'react';
import { Alert, Button, View, StyleSheet, Text, TextInput, Picker } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';

var  SampleArray = ['one', 'two'];

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
      playerNames: []
    }
  }

  printPlayerNames() {
    let test = ['1','2','3','4'];
    console.warn(this.state.playerNames)
    return this.state.playerNames.map((data) => {
      return (
        <TextInput>
          style={{borderColor: 'gray'}}

        </TextInput>
      )
    })
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

  render() {
    return (
      <View style={{padding: 140}}>
        <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Enter Player Names</Text>
          <TextInput
            style={{height: 40, width: 90, borderColor: 'gray', borderWidth: 1}}
            placeholder = 'Player 1'
            onChangeText={text0 => this.setState({ p1 : text0 }) }

            //value={this.state.text}
          />

          <TextInput
            style={{height: 40, width: 90, borderColor: 'gray', borderWidth: 1}}
            placeholder = 'Player 2'
            onChangeText={(text1) => this.setState({p2: text1})}
            //value={this.state.text}
          />

          <TextInput
            style={{height: 40, width: 90, borderColor: 'gray', borderWidth: 1}}
            placeholder = 'Player 3'
            onChangeText={(text2) => this.setState({p3: text2})}
            //value={this.state.text}
          />

          <TextInput
            style={{height: 40, width: 90, borderColor: 'gray', borderWidth: 1}}
            placeholder = 'Player 4'
            onChangeText={(text3) => this.setState({p4: text3})}
           // value={this.state.text}
          />
          <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{width: 180, height: 50}} >
              <Button
                title="Display Names"
                color="gray"
                accessibilityLabel="Display the entered names for test/preview purposes."
                //onPress={() => { Alert.alert(this.state.playerNames.toString()); }}
                onPress={() => { this.addItemsToArray() }}
              />
            </View>

            <View style={{width: 140, height: 50}} >
              <Button
                title="Start Game"
                color="green"
                accessibilityLabel="Start the game with the given player names!"
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  this.props.navigation.navigate('Categories', {});
                }}
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
