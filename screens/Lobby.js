import React from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class LobbyScree extends React.Component {
  static navigationOptions = {
    title: 'Lobby'
  };
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 140}}>
        <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>How many players?</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 5}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />

        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word).join(' ')}
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
