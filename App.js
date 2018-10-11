// In App.js in a new project
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/Home.js';
import SettingsScreen from './screens/Settings.js';
import DrawingScreen from './screens/Drawing.js';
import LobbyScreen from './screens/Lobby.js'

const Navigation = createStackNavigator({
    Home: {screen: HomeScreen},
    Settings: {screen: SettingsScreen},
    Drawing: {screen: DrawingScreen},
    Lobby: {screen: LobbyScreen}

})

export default class App extends React.Component {
    render() {
        return <Navigation />;
    }
}
