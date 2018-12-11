import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require('./img/paint_splatters.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        <View style = {styles.container}>
          <View style = {styles.instructionsBox}>
            <Text style= {{fontSize: 30, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>Welcome to Brush Off!</Text>
            <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>
              Brush Off is a drawing competetion game! To start a round, click Start Game on the home screen
              to go a lobby to start a new round! Enter your name, then pass the phone to another player
              so they can enter their name.

              When you click Start Game in the lobby, a player will be chosen to be the judge over this rounds drawings!
              That judge will choose from four possible prompt categories that the other players will each take a turn drawing.
              The artists are on a timer though, and will only have so much time to draw their masterpiece before
              it is the next players turn and the previous player must pass their phone along.

              Once all players have had their turn, the judge will select the winning image, and that player
              will receive one point for winning the round! From there you will be taken to a scoreboard screen
              where you can choose to go into a new round with the same players and points, or go back to the main menu.
            </Text>
          </View>
          <Button
            title="Home"
            color="gray"
            accessibilityLabel="Return to the home screen."
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Home', {
              });
            }}
          />
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
  instructionsBox: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: 'white',
    // width: windowWidth - 110,
    // height: windowHeight - 200,
    borderRadius: 10,
    marginBottom: 150,
    marginTop: 150,
    borderColor: 'grey',
    borderWidth: 2,
    opacity: .85,
  }
});
