import React from 'react';
import Expo from 'expo';
import FileSystem from 'expo';
import { Button, View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image , Dimensions} from 'react-native';
import { createStackNavigator } from 'react-navigation';

/*
This files creates the homescreen for the game. When the game starts up
it automatically navigates to this screen. Players are provided two options:
Play Game or Settings.
*/


export default class Home extends React.Component {
    static navigationOptions = {
        title: 'Home Screen'
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
          <ImageBackground
            source={require('./img/new-home.jpg')}
            imageStyle={{resizeMode: 'stretch'}}
            style={{flex: 1}}
          >
            <View style = {styles.container}>
              <View style = {styles.buttonBackground}>

                <View style={styles.fillerButton} >
                  <TouchableOpacity
                    onPress={() => {
                      /* 1. Navigate to the Details route with params */
                      this.props.navigation.navigate('Lobby', {
                      });
                    }}>
                    <Image
                      style={styles.buttonImage}
                      source={require('./img/playgamebutton.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.fillerButton} >
                  <TouchableOpacity
                    onPress={() => {
                      /* 1. Navigate to the Details route with params */
                      this.props.navigation.navigate('Instructions', {
                      });
                    }}>
                    <Image
                      style={styles.buttonImage}
                      source={require('./img/instructionsbutton.png')}
                    />
                  </TouchableOpacity>
                </View>


              </View>
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
    alignSelf: 'center',
    backgroundColor: 'white',
    width: windowWidth - 110,
    height: windowHeight - 200,
    borderRadius: 10,
    marginBottom: 250,
    marginTop: 240,
    borderColor: 'grey',
    borderWidth: 2,
    opacity: .85,
  },
  buttonBackground: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    flex: 1,
    height: 30,
    width: 170,
  },
  buttonImage: {
    resizeMode: 'contain',
    flex: 1,
    width: 234,
    height: 55,
  },
  fillerButton: {
    flex:1,
  },
});
