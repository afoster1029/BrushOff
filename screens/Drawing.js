import Expo from 'expo';
import * as ExpoPixi from 'expo-pixi';
import React, { Component } from 'react';
import { Image, Button, Platform, AppState, StyleSheet, Text, View } from 'react-native';
import { TouchableHighlight } from 'react-native'

const isAndroid = Platform.OS === 'android';

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

  onReady = () => {
    console.log('ready!');
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
        <TouchableHighlight
          onPress={() => {
            {this.setState({
              strokeColor: 0x0000ff,
            })}
          }}>
          <Image
            style={styles.colorButton}
            source={require('/Users/alexanderfoster/BrushOff/color_buttons/bluebutton.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            {this.setState({
              strokeColor: 0xff0000,
            })}
          }}>
          <Image
            style={styles.colorButton}
            source={require('/Users/alexanderfoster/BrushOff/color_buttons/redbutton.png')}
          />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            {this.setState({
              strokeColor: 0x00ff00,
            })}
          }}>
          <Image
            style={styles.colorButton}
            source={require('/Users/alexanderfoster/BrushOff/color_buttons/greenbutton.png')}
          />
        </TouchableHighlight>

        </View>
        <Button
          color={'blue'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo();

          }}
        />
        <Button
          color={'red'}
          title="clear"
          style={styles.button}
          onPress={() => {
            {this.clearScreen()}
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
    height: 40,
    width: 40,
  },
});
