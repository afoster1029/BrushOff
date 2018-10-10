// In App.js in a new project
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
<<<<<<< HEAD
import { createStackNavigator } from 'react-navigation';
=======
import { StackNavigator, createStackNavigator } from 'react-navigation';
>>>>>>> 31049577b64f9d3bb17ff68fa1fd155cd25b1d2b

import HomeScreen from './screens/Home.js';
import SettingsScreen from './screens/Settings.js';
import DrawingScreen from './screens/Drawing.js';

const Navigation = createStackNavigator({
<<<<<<< HEAD
  Home: {screen: HomeScreen},
  Settings: {screen: SettingsScreen},
  Drawing: {screen: DrawingScreen}
=======
    Home: {screen: HomeScreen},
    Settings: {screen: SettingsScreen},
    Drawing: {screen: DrawingScreen}
>>>>>>> 31049577b64f9d3bb17ff68fa1fd155cd25b1d2b

})

export default class App extends React.Component {
  render() {
    return <Navigation />;
  }
}
