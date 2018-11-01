// In App.js in a new project
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { StackNavigator, createStackNavigator } from 'react-navigation';
import {AppRegistry} from 'react-native';
import HomeScreen from './screens/Home.js';
import SettingsScreen from './screens/Settings.js';
import DrawingScreen from './screens/Drawing.js';
import LobbyScreen from './screens/Lobby.js'
import InterPlayerScreen from './screens/InterPlayer.js'
import VotingScreen from './screens/Voting.js'
import WinnerScreen from './screens/Winner.js'
import CategoriesScreen from './screens/Categories.js'



const Navigation = createStackNavigator({
    Home: {screen: HomeScreen},
    Settings: {screen: SettingsScreen},
    Drawing: {screen: DrawingScreen},
    Lobby: {screen: LobbyScreen},
    InterPlayer: {screen: InterPlayerScreen},
    Voting: {screen: VotingScreen},
    Winner: {screen: WinnerScreen},
    Categories: {screen: CategoriesScreen}

})

export default class App extends React.Component {
    render() {
        return <Navigation />;
    }
}

/*
Found a link that shows how to make sounds. Could be a cool addition to when someone wins
- https://hackernoon.com/how-i-built-a-super-simple-game-using-react-native-67bdade50373
 */
