
import Expo from 'expo';
import { FileSystem, takeSnapshotAsync, Permissions } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, AsyncStorage, Modal,StatusBar } from 'react-native';
import { TouchableHighlight, TouchableOpacity, Alert, Dimensions} from 'react-native'   //Alert may be the wrong command
import { createStackNavigator, NavigationActions } from 'react-navigation';
import TimerCountdown from 'react-native-timer-countdown';
import { ColorWheel } from 'react-native-color-wheel';
import {BlurView, VibrancyView} from 'react-native-blur';
<script src="https://unpkg.com/colorsys@1.0.11/colorsys.js"></script>
import * as everything from './Lobby.js'


const isAndroid = Platform.OS === 'android';
const timer = require('react-native-timer');
var imageList = ['','','','']
var colorsys = require('colorsys')
// const wordList = ['cat', 'dog', 'rifle', 'butter', 'vase', 'tail', 'monkey', 'stream', 'shoe', 'deer', 'library', 'thumb', 'baby', 'yard', 'jeans', 'rice', 'tiger',
// 'snail', 'quilt', 'crown', 'son', 'tax', 'swing', 'needle', 'grapes', 'doctor', 'grass', 'van', 'bee', 'basketball', 'wool', 'milk', 'dress', 'horse', 'cow', 'friction', 'cake',
// 'soup', 'fog', 'toothpaste', 'jellyfish', 'money', 'zebra', 'corn', 'hammer', 'grandmother', 'fangs', 'vacation', 'chickens', 'cheese']

function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
//Source:   https://github.com/expo/expo-pixi/blob/master/examples/sketch/App.js

export default class Drawing extends React.Component {
  constructor(props){
    super(props)
    var wordList = this.props.navigation.state.params.list
    var players = this.props.navigation.getParam('playerList', 'nothing passed')
    this.state = {
      image: null,
      strokeColor: 0xff0000,
      backgroundColor: 0x000000,
      transparent: false,
      strokeWidth: 20,
      count: 0,
      appState: AppState.currentState,
      makeDir: true,
      numPlayers: 4,
      playerNum: 1,
      completedImages: imageList,
      word: wordList[Math.floor(Math.random() * wordList.length)],
      playerList: players,
      wheelVisible: false,
    }
  }
  static navigationOptions = {
    title: 'BrushOff',
    headerLeft: null // this disables the option to go back to the previous screen.
  };

  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (isAndroid && this.sketch) {
        this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  clearAlert() {
    Alert.alert(
      'Are you sure you want to clear?',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => {this.clearScreen()}},
      ],
      { cancelable: false }
    )
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  componentWillUnmount() {     //maybe add timer.clearTimeout(this); to this function?
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
  }

  onChangeAsync = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync();

    this.setState({
      image: { uri },
      strokeWidth: 20,
      count: this.state.count + 1
    });
  };

  clearScreen() {
    for(i = 0; i < this.state.count; i++) {
      this.sketch.undo();
    }
  }

  launchColorWheel(bool) {
    this.setState({wheelVisible: bool})
  }

  handleColorWheelChange(newColor) {
    newColorString = String(colorsys.hsvToHex(newColor));
    newColorHexForm = "0x" +newColorString.substring(1,7);
    newColorInt = parseInt(newColorHexForm);
    this.setState({
      strokeColor: newColorInt,
    })
  }

  nextPlayerAlert() {
    Alert.alert(
      'Next player',
      '',
      [
        {text: 'GO', onPress: () => {this.clearScreen()}},
      ],
      { cancelable: false }
    )
  }

  saveImage = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync({
      result: 'file',
      format: 'png'
    });
    this.state.completedImages[this.state.playerNum - 1] = uri;
    if(this.state.playerNum < this.state.numPlayers) {
      this.state.playerNum += 1;
      this.nextPlayerAlert();
    } else {
      this.clearScreen();
      this.state.playerNum = 0;
      this.props.navigation.navigate('Voting',
        {images : this.state.completedImages, playerList: this.state.playerList});
    }

  }

  onReady = () => {
    console.log('ready!');
    console.log(everything)
    timer.setTimeout(this,'round over',() => console.log('time is up!'), 30000);
    console.log('word of the day is', this.state.word);
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TimerCountdown
          initialSecondsRemaining={1000 * 60}
          onTick={secondsRemaining => console.log("tick", secondsRemaining)}
          onTimeElapsed={() => {this.saveImage()}}
          allowFontScaling={true}
          style={{ fontSize: 20 }}
        />
        <Text id = 'wordOfTheDay' style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        {this.state.playerList[this.state.playerNum - 1]} {this.state.word} </Text>
          <View style={styles.container}>
            <View style={styles.sketchContainer}>
              <ExpoPixi.Sketch
                ref={ref => (this.sketch = ref)}
                style={styles.sketch}
                backgroundColor={this.state.backgroundColor}
                transparent={this.state.transparent}
                strokeColor={this.state.strokeColor}
                strokeWidth={this.state.strokeWidth}
                strokeAlpha={1}
                onChange={this.onChangeAsync}
                onReady={this.onReady}
              />
            </View>
          </View>
          <View>
            <Modal
              visible= {this.state.wheelVisible}
              transparent= {true}
              animationType='fade'
              onRequestClose={() => null}
              >
                      <ColorWheel
                      initialColor="#eeeeee"
                      onColorChange={color => {this.handleColorWheelChange(color)}}
                      style={{ padding: 5}}
                       />
                      <Button
                        title = 'Close Wheel'
                        onPress={() => {
                          {this.launchColorWheel(false)}
                        }}
                      />
            </Modal>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom:1}}>
            <TouchableOpacity
              onPress={() => {
                {this.setState({
                  strokeColor: 0x0000ff,
                })}
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/bluebutton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                {this.setState({
                  strokeColor: 0xff0000,
                })}
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/redbutton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                {this.setState({
                  strokeColor: 0x00ff00,
                })}
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/greenbutton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                {this.setState({
                  strokeColor: 0x000000,
                })}
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/blackbutton.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                {this.launchColorWheel(true)}
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/color_palette.png')} //<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
              />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {
              this.sketch.undo();
            }}>
              <Image
                style={styles.colorButton}
                source={require('./img/undo-arrow.png')} //Credit:Dave Gandy on FLATICON: https://www.flaticon.com/free-icon/undo-arrow_25249
              />
            </TouchableOpacity>
          </View>
          <Button
            color={'red'}
            title="Clear"
            style={styles.button}
            onPress={() => {
              {this.clearAlert()}
            }}
          />
          <Button
            color={'green'}
            title="Submit"
            style={styles.button}
            onPress= { ()=> {
              {this.saveImage()}
            }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    flex: 1,
  },
  sketchContainer: {
    height: '100%',
  },
  image: {
    flex: 1,
  },
  imageContainer: {
    height: '100%',
    borderTopWidth: 4,
    borderTopColor: '#E44262',
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center',
  },
  button: {
    //position: 'absolute',
    //bottom: 8,
    //left: 8,
    zIndex: 2,
    padding: 12,
    minWidth: 56,
    minHeight: 48,
  },
  colorButton: {
    height: 30,
    width: 30,
  },
});
