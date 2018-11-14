import React from 'react';
import Expo from 'expo';
import FileSystem from 'expo';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
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
          <ImageBackground
            source={require('./img/paint_splatters_logo.png')}
            imageStyle={{resizeMode: 'stretch'}}
            style={{flex: 1}}
          >
            <View style = {styles.container}>
              <View style = {{flex: 1, flexDirection: 'column', backgroundColor: 'transparent', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <View style={{width: 70, height: 50}} >
                  <Button
                    title="Lobby"
                    color="green"
                    accessibilityLabel="Set up a game with up to five players!"
                    onPress={() => {
                      /* 1. Navigate to the Details route with params */
                      this.props.navigation.navigate('Lobby', {});
                    }}
                  />
                </View>

                <View style={{width: 90, height: 50}} >
                  <Button
                    title="Play Game"
                    color="blue"
                    accessibilityLabel="Jump straight into messing around on a canvas!"
                    onPress={() => {
                      /* 1. Navigate to the Details route with params */
                      this.props.navigation.navigate('Categories', {
                      });
                    }}
                  />
                </View>

                <View style={{width: 90, height: 50}} >
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

              </View>
            </View>
          </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
