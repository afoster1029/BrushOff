import React from 'react';
import { Button, View, StyleSheet, Text, TextInput, Picker } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';

export default class LobbyScreen extends React.Component {
  static navigationOptions = {
    title: 'Lobby'
  };
  constructor(props) {
    super(props);
    this.state = {
      PickerValue : '',
      numPlayers: '',
      setNumPlayers: 0,
      playerNames: []
    };
  }



  render() {
    return (
      <View style={{padding: 140}}>
        <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>How many players?</Text>


        <Picker
          style = {{width:'120%',height:75}}
          itemStyle={{height: 85}}
          selectedValue = {this.state.PickerValue}
          onValueChange = {(itemValue, itemIdex) =>
            this.state.playerNames = new Array(5),
            this.state.playerNames.map((data) => {
              return (
                <View> <Text>hello world</Text></View>
              )
            })

           }

          //this.clickme(itemValue)}
          //onValueChange = {(itemValue, itemIdex) => this.setState({ PickerValue:itemValue})}
        >

        <Picker.Item label = 'Select an option' value = '' />
        <Picker.Item label = '2' value = '2' />
        <Picker.Item label = '3' value = '3' />
        <Picker.Item label = '4' value = '4' />
        <Picker.Item label = '5' value = '5' />
        <Picker.Item label = '6' value = '6' />
        <Picker.Item label = '7' value = '7' />
        <Picker.Item label = '8' value = '8' />
        </Picker>

       {/* <Button title='Add Player Names' onPress={this.state.clickme}/>*/}



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

// <TextInput
//   style={{height: 40, borderColor: 'gray', borderWidth: 5}}
//   onChangeText={(numPlayers) => this.setState({numPlayers})}
//
//
//   numPlayers = {this.state.text}
//   value={this.state.text}
//
// />
//
//
// <Text style={{padding: 10, fontSize: 42}}>
//   {this.state.numPlayers.split(' ').map((word) => word).join(' ')}
// </Text>


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
