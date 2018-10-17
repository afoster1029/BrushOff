import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight, TouchableOpacity, FileSystem, Alert} from 'react-native'
import TimerMixin from 'react-timer-mixin';

const isAndroid = Platform.OS === 'android';
const timer = require('react-native-timer');

function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


//Source:   https://github.com/expo/expo-pixi/blob/master/examples/sketch/App.js

export default class Drawing extends Component {
  state = {
    image: null,
    strokeColor: 0x000000,
    strokeWidth: 20,
    count: 0,
    appState: AppState.currentState,

  };
  static navigationOptions = {
    title: 'BrushOff'
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


  onReady = () => {
    console.log('ready!');
    timer.setTimeout(this,'round over',() => console.log('time is up!'), 30000);
    //const { blank } = this.sketch.takeSnapshotAsync();
  };

  

  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style= {{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Draw a dog</Text>
        <View style={styles.container}>
          <View style={styles.sketchContainer}>
            <ExpoPixi.Sketch
              ref={ref => (this.sketch = ref)}
              style={styles.sketch}
              strokeColor={this.state.strokeColor}
              strokeWidth={this.state.strokeWidth}
              strokeAlpha={1}
              onChange={this.onChangeAsync}
              onReady={this.onReady}
            />
            <View style={styles.label}>
              <Text>Canvas - draw here or dont</Text>
            </View>
          </View>
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
            source={require('./img/blackbutton.jpg')}
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
          title="clear"
          style={styles.button}
          onPress={() => {
            {this.clearAlert()}
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
    zIndex: 1,
    padding: 12,
    minWidth: 56,
    minHeight: 48,
  },
  colorButton: {
    height: 30,
    width: 30,
  },
});
