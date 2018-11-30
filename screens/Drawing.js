
import Expo from 'expo';
import { FileSystem, takeSnapshotAsync, Permissions } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, AsyncStorage,StatusBar, Slider } from 'react-native';
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
    const players = this.props.navigation.getParam('playerInfo', 'nothing passed')
    this.state = {
      image: null,
      strokeColor: 0x000000,
      backgroundColor: 0x000000,
      transparent: false,
      strokeWidth: 20,
      count: 0,
      appState: AppState.currentState,
      makeDir: true,
      numPlayers: players.length,
      playerNum: 0, // tracks which player is to be selected to starting drawing first. Set to 1 so that it skips first player (judge)
      round: 1,
      completedImages: imageList,
      word: wordList[Math.floor(Math.random() * wordList.length)],
      playerInfo: players,
      wheelVisible: false,
      interPlayerVisible: false,
      colorModalVisible: false,
      strokeSliderVisible: false,
      preGameModalVisible: true,
    }
    this.handleJudge();
  }

  static navigationOptions = {
    title: 'BrushOff',
    headerLeft: null, // this disables the option to go back to the previous screen.
    //header: { visible:false },
    gesturesEnabled: false,
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

  handleJudge() {
    const playerInfo = this.state.playerInfo;
    for(var i = 0; i < playerInfo.length; i++) {
      if(playerInfo[i].isJudge) {
        if(i == this.state.playerNum) {
          if(i < this.state.playerInfo.length - 1) {
            this.state.playerNum++;
          } else {
            this.state.playerNum = 0;
          }
        }
      }
    }
  }

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
      //strokeWidth: 20,
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

  launchStrokeModal(bool) {
    this.setState({strokeSliderVisible: bool})
  }

  launchInterPlayer() {
    this.setState({interPlayerVisible: true})
  }

  closeInterPlayer() {
    this.clearScreen()
    this.setState({interPlayerVisible: false, strokeColor: 0x000000, strokeWidth:20})
  }

  closePreGame() {
    this.setState({preGameModalVisible: false})
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
    console.log('DEBUGG - '+ this.state.playerNum, this.state.numPlayers)
    this.state.playerInfo[this.state.playerNum]['img'] = uri;
    if(this.state.playerNum < this.state.numPlayers - 1 &&
        !(this.state.playerInfo[this.state.numPlayers - 1].isJudge && (this.state.playerNum === this.state.numPlayers - 2))) {
      this.state.playerNum += 1;
      this.handleJudge();
      this.launchInterPlayer();
    } else {
      this.clearScreen();
      this.state.playerNum = 0;
      this.props.navigation.navigate('Voting', {playerInfo: this.state.playerInfo});
    }
  }

  onReady = () => {
    console.log('ready! ');
    console.log('word of the day is', this.state.word);
    console.log('drawing screen! '+this.state.playerInfo)
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>

        <View style= {styles.upperText}>
          <View style={{marginTop:25}}>
            <Text id = 'wordOfTheDay' style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
           {this.state.word} </Text>
           <Text style={{fontSize: 14, textAlign:'center'}}>{this.state.playerInfo[this.state.playerNum]['name']} </Text>
          </View>
        </View>
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
              thumbStyle={{ height: 30, width: 30, borderRadius: 30}}
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

                  <Text style = {{fontSize: 24, fontWeight: 'bold',}}> That was a  </Text>
                  <Text style = {{fontSize: 24, fontWeight: 'bold'}}> spectacular drawing! </Text>

                  <Text style = {{fontSize: 18, fontWeight: 'bold', color: 'grey'}}> Next Player: {this.state.playerInfo[this.state.playerNum]['name']} </Text>
                  <View style= {{marginTop: 15, borderRadius:10, borderColor: 'grey', borderWidth: 2, backgroundColor: 'white', opacity: .7}}>
                    <Button
                      title="Next Player"
                      color= "grey"
                      onPress={() => this.closeInterPlayer()}
                    />
                  </View>
                </View>
            </Modal>
          </View>
          <View>
            <Modal
              isVisible= {this.state.preGameModalVisible}
              backdropOpacity={.50}>
                <View style= {styles.interPlayerPopUp}>

                  <Text style = {{fontSize: 24, fontWeight: 'bold',}}> Let the  </Text>
                  <Text style = {{fontSize: 24, fontWeight: 'bold'}}> games begin! </Text>

                  <Text style = {{fontSize: 18, fontWeight: 'bold'}}> First Player: {this.state.playerInfo[this.state.playerNum
                  ]['name']} </Text>
                  <View style= {{marginTop: 18, borderRadius:10, borderColor: 'grey', borderWidth: 2, backgroundColor: 'white', opacity: .7}}>
                    <Button
                      title="Begin"
                      color= "grey"
                      onPress={() => this.closePreGame()}
                    />
                  </View>
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
                    <View style= {[styles.colorButtonView, {backgroundColor: '#0000FF'}]}> </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      {this.setState({
                        strokeColor: 0xff0000,
                      })}
                    }}>
                    <View style= {[styles.colorButtonView, {backgroundColor: '#FF0000'}]}> </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      {this.setState({
                        strokeColor: 0x00ff00,
                      })}
                    }}>
                    <View style= {[styles.colorButtonView, {backgroundColor: '#00FF00'}]}> </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      {this.setState({
                        strokeColor: 0x000000,
                      })}
                    }}>
                    <View style= {[styles.colorButtonView, {backgroundColor: '#000000'}]}> </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.launchColorWheel(true);
                    }}>
                    <Image
                      style={styles.colorButton}
                      source={require('./img/color_palette.png')}
                    />
                  </TouchableOpacity>
                </View>
            </Modal>
          </View>
          <View>
            <Modal
              isVisible= {this.state.strokeSliderVisible}
              backdropOpacity={0}
              onBackdropPress={() => this.launchStrokeModal(false)}
              >
                <View style= {styles.colorModal}>
                  <Slider style = {{ width: 300 }}
                    step={1}
                    minimumValue={1}
                    maximumValue={100}
                    value = {this.state.strokeWidth}
                    onSlidingComplete={val => this.setState({ strokeWidth: val })}
                  />
                </View>
            </Modal>
          </View>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={() => {
                this.launchColorModal(true);
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/brushicon.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.launchStrokeModal(true);
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/strokewidthicon.png')}
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
                this.clearAlert();
              }}>
              <Image
                style={styles.colorButton}
                source={require('./img/trashicon.png')} //Credit:Dave Gandy on FLATICON: https://www.flaticon.com/free-icon/undo-arrow_25249
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
    height: 35,
    width: 35,
  },
  colorWheel: {
    height:300,
    width: 300,
    position: 'absolute',
    top: 200,
    right:50,
    padding:40
  },
  interPlayerPopUp: {
    width: width - 50,
    height: height - 500,
    backgroundColor: '#D9C4DA',
    borderRadius:10,
    flexDirection: 'column',
    alignItems: 'center',

  },
  colorModal: {
    flexDirection: 'row',
    width: 160,
    height: 35,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 565,
    right: 195,
  },
  upperText: {
    borderBottomColor: 'grey',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#D9C4DA',
    padding:2,
  },
  iconBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom:2,
    borderTopColor: 'grey',
    borderColor: 'transparent',
    borderWidth: 2,
    padding:2,
  },
  colorButtonView: {
    width:30,
    height:30,
    borderRadius: 4,


  }
});
