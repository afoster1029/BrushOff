import React from 'react';
import Expo from 'expo';
import FileSystem from 'expo';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Home Screen',
        headerStyle: {
        backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style = {styles.container}>
                <Button
                  title="Play Game"
                  color="green"
                  accessibilityLabel="Set up a game with up to five players!"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Lobby', {

                    });
                  }}
                />
                <Button
                  title="Settings"
                  color="gray"
                  accessibilityLabel="Adjust the time each player had to draw the prompt!"
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    this.props.navigation.navigate('Settings', {

                    });
                  }}
                />


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
