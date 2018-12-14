import React from 'react';
<<<<<<< HEAD
import { Button, View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
=======
import { Dimensions, Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
>>>>>>> 5a802a39b959a6d9f1d5c84847343e1cf209b331
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
            <Text style= {styles.welcomeText}>Welcome to Brush Off!</Text>

            <Text></Text>

            <Text style= {styles.textStyle}>
              Brush Off is a drawing competetion game! You need at least three players to play!
            </Text>

            <Text></Text>

            <Text style= {styles.textStyle}>
              One player will be chosen as judge for each round!
              The judge will not draw, and will alternate each round. The
              artists are on a timer, and will only have so much time to draw their take.
            </Text>

            <Text></Text>

            <Text style= {styles.textStyle}>
              Once all artists have submitted their drawing the judge will select the winning drawing, and that player
              will receive a point for winning the round!
            </Text>
          </View>
          <View style= {{borderRadius:10, borderColor: 'grey', borderWidth: 2,backgroundColor: 'white', marginTop: 10,marginBottom: 20,width:120}}>
            <Button
              title="Back"
              color="grey"
              onPress={() => {this.goToHomeScreen()}}
            />
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth =  Dimensions.get('window').width;

const styles = StyleSheet.create({
  welcomeText: {
    width: windowWidth*0.82,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  },

  textStyle: {
    width: windowWidth*0.82,
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center'
  },

  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsBox: {


    alignSelf: 'center',
    backgroundColor: 'white',
    width: windowWidth *0.85,
    height: windowHeight *0.6,
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
