import React from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class LobbyScreen extends React.Component {
  static navigationOptions = {
    title: 'Lobby'
  };
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: '',
      setNumPlayers: 0
    };
  }

  render() {
    return (
      <View style={{padding: 140}}>
        <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>How many players?</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 5}}
          onChangeText={(numPlayers) => this.setState({numPlayers})}
          numPlayers = {this.state.text}
          value={this.state.text}
        />

        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.numPlayers.split(' ').map((word) => word).join(' ')}
        </Text>


      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



/*
  trying to make a fuction that will take in the user inputted value
  and then loop through a create that many text inputs for them to enter
  play names.
*/
// enterPlayerNames = () => {
//   var table = []
//   // Outer loop to create parent
//   for (var i = 0; i < this.state.setNumPlayers; i++) {
//     table.push(
//       <View>
//         <View>
//           <TextInput
//             style={{height: 40, borderColor: 'gray', borderWidth: 5}}
//            />
//         </View>
//
//         <View>
//           <TextInput
//             style={{height: 40, borderColor: 'gray', borderWidth: 5}}
//            />
//         </View>
//
//         <View>
//           <TextInput />
//         </View>
//       </View>
// )
//   }
// }
