import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Instructions'
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

            <Text></Text>

            <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>
              Brush Off is a drawing competetion game! You need at least three players to play!
            </Text>

            <Text></Text>

            <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>
              One player will be chosen as judge for each rounds drawings!
              That judge will choose from four prompt categories that the other players will each take a
              turn drawing. The judge will not draw on the drawing screen, and will alternate next round. The
              artists are on a timer, and will only have so much time to draw their take.
            </Text>

            <Text></Text>

            <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}}>
              Once all players have had their turn the judge will select the winning image, and that player
              will receive one point for winning the round! You can then choose to start a new round with the same
              players and points, or quit.
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

const windowHeight = Dimensions.get('window').height;
const windowWidth =  Dimensions.get('window').width;

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
    width: windowWidth - 110,
    height: windowHeight - 200,
    borderRadius: 10,
    paddingBottom: 10,
    marginTop: 15,
    borderColor: 'grey',
    borderWidth: 2,
    opacity: .85,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
