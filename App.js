// In App.js in a new project
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';
import HomeScreen from './screens/Home.js';
import InstructionsScreen from './screens/Instructions.js';
import DrawingScreen from './screens/Drawing.js';
import LobbyScreen from './screens/Lobby.js'
import VotingScreen from './screens/Voting.js'
import WinnerScreen from './screens/Winner.js'
import CategoriesScreen from './screens/Categories.js'

const Navigation = createStackNavigator({
    Home: {screen: HomeScreen},
    Instructions: {screen: InstructionsScreen},
    Drawing: {screen: DrawingScreen},
    Lobby: {screen: LobbyScreen},
    Voting: {screen: VotingScreen},
    Winner: {screen: WinnerScreen},
    Categories: {screen: CategoriesScreen}
  },
    { headerMode: 'none' }
)

export default class App extends React.Component {
    render() {
        return <Navigation />;
    }
}
