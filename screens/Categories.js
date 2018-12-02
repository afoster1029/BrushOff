import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Dimensions , TouchableOpacity, Image, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';


//import Drawing from '/Users/johnpellegrini/BrushOff/screens/Drawing.js';

const randomWordList = [ 'Rifle', 'Butter', 'Vase', 'Tail',  'Stream', 'Shoe',  'Library', 'Thumb', 'Baby', 'Yard', 'Jeans', 'Rice',
'Quilt', 'Crown', 'Son', 'Tax', 'Swing', 'Needle', 'Grapes', 'Doctor', 'Grass', 'Van', 'Basketball', 'Wool', 'Milk', 'Dress', 'Friction', 'Cake',
'Soup', 'Fog', 'Toothpaste',  'Money',  'Corn', 'Hammer', 'Grandmother', 'Fangs', 'Vacation', 'Cheese']

const sportsWordList = ['Basketball', 'Baseball', 'Touchdown', 'Goal', 'Homerun']

const artsWordList = ['Monet', 'Impressionism', 'Starry Night', 'Salvador Dali', ]

const animalWordList = ['Cow', 'Dog', 'Chicken', 'Starfish', 'Octopus', 'Whale','Jellyfish','Bee', 'Horse']

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
    this.state.playerInfo[0]['isJudge'] = true;
    this.props.navigation.navigate('Drawing',{list: categoryList, playerInfo: this.state.playerInfo});

  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require('./img/categories-back.jpg')}
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
