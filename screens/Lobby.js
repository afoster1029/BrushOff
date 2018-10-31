import React from 'react';
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
      playerNames: []
    }
    global.names = this.p1;

    this.getPlayerNames = this.getPlayerNames.bind(this);
  }

  getPlayerNames() {
    return this.state.p1.toString()
  }

  startGame() {
    this.props.navigation.navigate('Drawing', {});
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

        <Button
          title="Display names"
          //onPress={() => { Alert.alert(this.state.playerNames.toString()); }}
          onPress={() => { this.addItemsToArray() }}
        />

        <Button
          title="Start Game"
          onPress={() => { this.startGame() }}
        />




      </View>





    )
  }


}

// module.exports = {
//   names : LobbyScreen.playerNames,
//   p1: LobbyScreen.p1
// }
export const playerNames = 2;
export const p1  = global.names;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
