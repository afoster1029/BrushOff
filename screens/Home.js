import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Home extends React.Component {
<<<<<<< HEAD
  static navigationOptions = {
    title: 'Home Screen'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text
          onPress= { ()=> navigate('Drawing') }>Play game
        </Text>
        <Text
          onPress= { ()=> navigate('Settings') }>Settings
        </Text>
      </View>
    )
  }
=======
    static navigationOptions = {
        title: 'Home Screen'
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style = {styles.container}>
                <Button
                  title="Lobby"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Lobby', {

                    });
                  }}
                />

                <Button
                  title="Play Game"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Drawing', {

                    });
                  }}
                />

                <Button
                  title="Settings"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Settings', {

                    });
                  }}
                />
            </View>
        )
    }
>>>>>>> 31049577b64f9d3bb17ff68fa1fd155cd25b1d2b
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
