import Expo from 'expo';
import { takeSnapshotAsync, Permissions } from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View, AsyncStorage,StatusBar, Slider, PixelRatio, BackHandler } from 'react-native';
import { TouchableHighlight, TouchableOpacity, Alert, Dimensions} from 'react-native'   //Alert may be the wrong command
import { createStackNavigator, NavigationActions } from 'react-navigation';
import Modal from "react-native-modal";
import TimerMixin from 'react-timer-mixin';
<script src="https://unpkg.com/colorsys@1.0.11/colorsys.js"></script>
import * as everything from './Lobby.js'


const isAndroid = Platform.OS === 'android';
const timer = require('react-native-timer');
var imageList = ['','','','']
var colorsys = require('colorsys')
const colorButtonList= ['#FFFFFF', '#C0C0C0', '#808080', '#000000', '#FF0000', '#800000', '#FFFF00', '#808000',
'#00FF00', '#008000','#00FFFF', '#008080', '#0000FF', '#000080','#FF00FF', '#800080', '#D2691E']
const height = Dimensions.get('window').height;
const width =  Dimensions.get('window').width;

/*
* Returns a globally unique identifier
*/
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
      backgroundColor: 'transparent',
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
      timer: 60,
      hasDrawn: false,
      lines: [ //This dot prevents the game from crashing when nothing is drawn
      {
        points: [{ x: 0, y: 0 },{ x: 0, y: 0 }],
        color: 0x000000,
        alpha: 1,
        width: 1,
      },
    ],
    }
    this.handleJudge();
  }

  static navigationOptions = {
    title: 'BrushOff',
    headerLeft: null, // this disables the option to go back to the previous screen.
    //header: { visible:false },
    gesturesEnabled: false,
  };

  /*
  *
  */
  handleAppStateChangeAsync = nextAppState => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      if (isAndroid && this.sketch) {
        this.setState({ appState: nextAppState, id: uuidv4(), lines: this.sketch.lines });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  /*
  * When cycling between current drawers, this function checks to see if the currentState
  * player is a judge so it can skip to the next player in order
  */
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

  /*
  * Alert message when user presses clear button
  */
  clearAlert() {
    Alert.alert(
      'Are you sure you want to clear?',
      '',
      [
        {text: 'Cancel', onPress: () => null},
        {text: 'Yes', onPress: () => {this.clearScreen()}},
      ],
      { cancelable: false }
    )
  }

  /*
  * Starts the timer and sets its interval to 1 second
  */
  startTimer() {
    this.interval = TimerMixin.setInterval(
      () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
      1000
    );
  }

  /*
  * Stops the timer, and resets its time to 60 seconds
  */
  resetTimer() {
    TimerMixin.clearInterval(this.interval)
    this.state.timer = 60;
  }

  /*
  * Invoked when drawing component is mounted (inserted into tree)
  */
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    AppState.addEventListener('change', this.handleAppStateChangeAsync);
  }

  /*
  * Invoked immediately after updating occurs. When timer reaches 0, timer
  * is reset and image is saved
  */
  componentDidUpdate(){
    if(this.state.timer === 0 ){
      this.resetTimer();
      this.saveImage();
    }
  }

  /*
  * Invoked immediately before a component is unmounted and destroyed. Clears timer
  */
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    AppState.removeEventListener('change', this.handleAppStateChangeAsync);
    TimerMixin.clearInterval(this.interval)
  }

  /*
  * Disables android back button
  */
  handleBackButton() {
    return true;
  }

  /*
  * When ever ExpoPixi sketch is updated, this function takes a snapshot of
  * the current sketch and sets the state image to the snapshot. Also logs The
  * number of lines drawn
  */
  onChangeAsync = async () => {
    this.state.hasDrawn = true;
    const { uri } = await this.sketch.takeSnapshotAsync();
    this.setState({
      image: { uri },
      count: this.state.count + 1
    });
  };

  /*
  * Clears all lines drawn
  */
  clearScreen() {
    for(i = 0; i < this.state.count; i++) {
      this.sketch.undo();
    }
  }

  getJudge(playerInfo) {
    var judge;
    for(var i = 0; i < playerInfo.length; i++) {
      if(playerInfo[i].isJudge) {
        judge = playerInfo[i]
      }
    }
    return judge;
  }

  /*
  * Launches color selector modal
  */
  launchColorModal(bool) {
    this.setState({colorModalVisible: bool})
  }

  /*
  * Launches stroke width slider modal
  */
  launchStrokeModal(bool) {
    this.setState({strokeSliderVisible: bool})
  }

  /*
  * Launches inter player modal
  */
  launchInterPlayer() {
    this.setState({interPlayerVisible: true})
  }

  /*
  * Closers interplayer modal, starts timer and resets drawing settings
  */
  closeInterPlayer() {
    this.clearScreen()
    this.startTimer()
    this.setState({interPlayerVisible: false, timerOn: true, strokeColor: 0x000000, strokeWidth:20})
  }

  /*
  * Closes pregame modal, starts the timer
  */
  closePreGame() {
    this.startTimer()
    this.setState({preGameModalVisible: false, timerOn: true})

  }

  /*
  * Changes stroke color based on color button pressed
  */
  handleColorButtonPress(newColor) {
    newColorHexForm = "0x" +newColor.substring(1,7);
    newColorInt = parseInt(newColorHexForm);
    this.setState({
      strokeColor: newColorInt,
      colorModalVisible: false,
    })
  }

  /*
  * Saves the sketch drawn under the current drawer. Resizes the image according
  * to screen dimensions
  */
  saveImage = async () => {
    const { uri } = await this.sketch.takeSnapshotAsync({
      result: 'file',
      format: 'png',
    });

    this.state.playerInfo[this.state.playerNum].img = uri;
    this.nextPlayer();
  }

  /*
  * Goes to the next drawer. If it was the last drawer, navigates to the Voting
  * screen
  */
  nextPlayer() {
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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style= {styles.upperText}>
          <View style={{marginTop:20}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text id = 'wordOfTheDay' style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}> {this.state.word} </Text>
              <Text style= {{fontSize: 14, fontWeight: 'bold',position: 'absolute', right: 15}}> {this.state.timer} </Text>
            </View>
            <Text style={{fontSize: 14, textAlign:'center'}}>{this.state.playerInfo[this.state.playerNum]['name']} </Text>
          </View>
        </View>
          {/*View that contains the area for sketching*/}
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
                initialLines={this.state.lines}
              />
            </View>
          </View>
          {/*Inter player modal*/}
          <View>
            <Modal
              isVisible= {this.state.interPlayerVisible}
              backdropOpacity={.50}>
                <View style= {styles.interPlayerPopUp}>

                  <Text style = {{fontSize: 24, fontWeight: 'bold',}}> That was a  </Text>
                  <Text style = {{fontSize: 24, fontWeight: 'bold'}}> spectacular drawing! </Text>

                  <Text style = {{fontSize: 18}}> Next Player: {this.state.playerInfo[this.state.playerNum]['name']} </Text>
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
          {/*Modal that is shown at beginning of round*/}
          <View>
            <Modal
              isVisible= {this.state.preGameModalVisible}
              backdropOpacity={.50}>
                <View style= {styles.interPlayerPopUp}>
                  <Text style = {{fontSize: 24, fontWeight: 'bold',}}> Let the  </Text>
                  <Text style = {{fontSize: 24, fontWeight: 'bold'}}> games begin! </Text>

                  <Text style = {{fontSize: 18}}> {this.getJudge(this.state.playerInfo).name} is the judge of this round</Text>
                  <Text style = {{fontSize: 18}}> First Player: {this.state.playerInfo[this.state.playerNum]['name']} </Text>
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
          {/*
          * Modal that maps through list of rgb values to display buttons that
          * can be selected to change colors
          */}
          <View>
            <Modal
              isVisible= {this.state.colorModalVisible}
              backdropOpacity={0}
              onBackdropPress={() => this.launchColorModal(false)}
              >
                <View style= {styles.colorModal}>
                  {colorButtonList.map((rgb, idx)=> (
                    <View key = {idx}>
                      <TouchableOpacity
                        onPress={() => {this.handleColorButtonPress(rgb)}}>

                        <View style= {[styles.colorButtonView, {backgroundColor: rgb}] }>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ strokeColor: 0xdcdcdc })
                    }>
                    <Image
                      style={styles.colorButton}
                      source={require('./img/erasericon.png')}
                    />
                  </TouchableOpacity>
                </View>
            </Modal>
          </View>
          {/*Stroke width slider modal*/}
          <View>
            <Modal
              isVisible= {this.state.strokeSliderVisible}
              backdropOpacity={0}
              onBackdropPress={() => this.launchStrokeModal(false)}
              >
                <View style= {styles.sliderModal}>
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
          {/*
          * Buttons at bottom of screen for selecting colors, editing stroke width,
          * undoing a line, clearing a drawing, and submiting a drawing
          */}
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
                this.resetTimer();
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


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    flex: 1,
    backgroundColor: '#ff00ff',
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
    width: 214,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius:5,
    backgroundColor: 'white',
    position: 'absolute',
    top: screenHeight - 220,
    //transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }]
  },
  sliderModal: {
    position: 'absolute',
    top: screenHeight - 120,
    alignSelf: 'center',
    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]
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
    width:35,
    height:35,
    borderRadius: 4,
    padding: 2,

  }
});
