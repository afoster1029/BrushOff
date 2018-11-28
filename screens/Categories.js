import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Dimensions , TouchableOpacity, Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';


//import Drawing from '/Users/johnpellegrini/BrushOff/screens/Drawing.js';

const randomWordList = [ 'rifle', 'butter', 'vase', 'tail',  'stream', 'shoe',  'library', 'thumb', 'baby', 'yard', 'jeans', 'rice',
'quilt', 'crown', 'son', 'tax', 'swing', 'needle', 'grapes', 'doctor', 'grass', 'van', 'basketball', 'wool', 'milk', 'dress', 'friction', 'cake',
'soup', 'fog', 'toothpaste',  'money',  'corn', 'hammer', 'grandmother', 'fangs', 'vacation', 'cheese']

const sportsWordList = ['basketball', 'baseball', 'touchdown', 'goal', 'homerun']

const artsWordList = ['Monet', 'Impressionism', 'Starry Night', 'Salvador Dali', ]

const animalWordList = ['cow', 'dog', 'chicken', 'starfish', 'octopus', 'whale','jellyfish','bee', 'horse']

export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    const players = this.props.navigation.getParam('playerInfo', 'nothing passed');
    console.log(players);
    this.state = {
      playerInfo: players
  };
}

  static navigationOptions = {
    title: 'Categories',
    gesturesEnabled: false,
  };

  getValue() {
    return this.state.list
  }

  navigateToDrawing(categoryList) {
    this.props.navigation.navigate('Drawing', {list: categoryList, playerInfo: this.state.playerInfo});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require('./img/paint_splatters.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        <View style = {styles.container}>
          <View style = {styles.buttonBackground}>
            <View style={styles.fillerButton} >
              <TouchableOpacity
                onPress={() => {this.navigateToDrawing(sportsWordList)}}>
                <Image
                  style={styles.buttonImage}
                  source={require('./img/sportsbutton.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.fillerButton} >
              <TouchableOpacity
                onPress={() => {this.navigateToDrawing(artsWordList)}}>
                <Image
                  style={styles.buttonImage}
                  source={require('./img/artbutton.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.fillerButton} >
              <TouchableOpacity
                onPress={() => {this.navigateToDrawing(animalWordList)}}>
                <Image
                  style={styles.buttonImage}
                  source={require('./img/animalsbutton.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.fillerButton} >
              <TouchableOpacity
                onPress={() => {this.navigateToDrawing(randomWordList)}}>
                <Image
                  style={styles.buttonImage}
                  source={require('./img/randombutton.png')}
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
    marginBottom: 150,
    marginTop: 150,
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
  buttonImage: {
    resizeMode: 'contain',
    flex: 1,
    width: 170,
    height: 40,
  },
  fillerButton: {
    flex:1,
  },
});
