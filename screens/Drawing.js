
import Expo from 'expo';
import { FileSystem, takeSnapshotAsync, Permissions } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, AsyncStorage,StatusBar } from 'react-native';
import { TouchableHighlight, TouchableOpacity, Alert, Dimensions} from 'react-native'   //Alert may be the wrong command
import { createStackNavigator, NavigationActions } from 'react-navigation';
import TimerCountdown from 'react-native-timer-countdown';
import { ColorWheel } from 'react-native-color-wheel';
import Modal from "react-native-modal";
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
    // console.log(players[0]['name']) // check that players is loaded in correctly.
    this.state = {
      image: null,
      strokeColor: 0xff0000,
      backgroundColor: 0x000000,
      transparent: false,
      strokeWidth: 20,
      count: 0,
      appState: AppState.currentState,
      makeDir: true,
      numPlayers: players.length,
      playerNum: 1,
      completedImages: imageList,
      word: wordList[Math.floor(Math.random() * wordList.length)],
      playerList: players,
      wheelVisible: false,
      interPlayerVisible: false,
      colorModalVisible: false,
    }
  }
  static navigationOptions = {
    title: 'BrushOff',
    headerLeft: null, // this disables the option to go back to the previous screen.
    //header: { visible:false },
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

  componentWillUnmount() {
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

  launchColorModal(bool) {
    this.setState({colorModalVisible: bool})
  }

  launchColorWheel(bool) {
    this.launchColorModal(false);
    this.setState({wheelVisible: bool})
  }

  launchInterPlayer() {
    this.setState({interPlayerVisible: true})
  }

  closeInterPlayer() {
    this.clearScreen()
    this.setState({interPlayerVisible: false})
  }

  handleColorWheelChange(newColor) {
    newColorString = String(colorsys.hsvToHex(newColor));
    newColorHexForm = "0x" +newColorString.substring(1,7);
    newColorInt = parseInt(newColorHexForm);
    this.setState({
      strokeColor: newColorInt,
    })
  }

  saveImage = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync({
      result: 'file',
      format: 'png'
    });
    this.state.completedImages[this.state.playerNum - 1] = uri;
    if(this.state.playerNum < this.state.numPlayers) {
      this.state.playerNum += 1;
      this.launchInterPlayer();
    } else {
      this.clearScreen();
      this.state.playerNum = 1;
      this.props.navigation.navigate('Voting',
        {images : this.state.completedImages, playerList: this.state.playerList});
    }

  }

  onReady = () => {
    console.log('ready!');
    console.log(everything)
    console.log('word of the day is', this.state.word);
    console.log(this.state.playerList[this.state.playerNum - 1]['name']+ ' Draw a' +this.state.word);
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text id = 'wordOfTheDay' style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
        {this.state.playerList[this.state.playerNum - 1]['name']} Draw a {this.state.word} </Text>
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
              isVisible= {this.state.wheelVisible}
              backdropOpacity={.50}
              onBackdropPress={() => this.launchColorWheel(false)}
              style={styles.colorWheel}>
                  <ColorWheel
                  initialColor="#eeeeee"
                  onColorChange={color => {this.handleColorWheelChange(color)}}

                   />
            </Modal>
          </View>
          <View>
            <Modal
              isVisible= {this.state.interPlayerVisible}
              backdropOpacity={.50}>
                <View style= {styles.interPlayerPopUp}>
                  <Text style = {{fontSize: 24, fontWeight: 'bold'}}> That was a spectacular drawing! </Text>
                  <Text style = {{fontSize: 18, fontWeight: 'bold'}}> Next Player: {this.state.playerList[this.state.playerNum - 1]['name']} </Text>
                  <Button
                    title="Next Player"
                    onPress={() => this.closeInterPlayer()}
                  />
                </View>
            </Modal>
          </View>
          <View>
            <Modal
              isVisible= {this.state.colorModalVisible}
              backdropOpacity={0}
              onBackdropPress={() => this.launchColorModal(false)}
              >
                <View style= {styles.colorModal}>
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
                      this.launchColorWheel(true);
                    }}>
                    <Image
                      style={styles.colorButton}
                      source={require('./img/color_palette.png')} //<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                    />
                  </TouchableOpacity>
                </View>
            </Modal>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom:1}}>
            <TouchableOpacity onPress={() => {
                this.launchColorModal(true);
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/brushicon.png')}
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
            <TouchableOpacity
              onPress={() => {
                this.saveImage();
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/submiticon.png')} //Credit:Dave Gandy on FLATICON: https://www.flaticon.com/free-icon/undo-arrow_25249
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.clearAlert();
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/trashicon.png')} //Credit:Dave Gandy on FLATICON: https://www.flaticon.com/free-icon/undo-arrow_25249
              />
            </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const height = Dimensions.get('window').height;
const width =  Dimensions.get('window').width;

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
  colorWheel: {
    height:180,
    width: 180,
    position: 'absolute',
    top: 200,
    right:50
  },
  interPlayerPopUp: {
    width: width - 50,
    height: height - 200,
    backgroundColor: '#D9C4DA',
    borderRadius:10
  },
  colorModal: {
    flexDirection: 'row',
    width: 160,
    height: 35,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 565,
    right: 210,
  }
});
