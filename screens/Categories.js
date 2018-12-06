import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground, Dimensions , TouchableOpacity, Image, Alert} from 'react-native';
import { createStackNavigator } from 'react-navigation';


//import Drawing from '/Users/johnpellegrini/BrushOff/screens/Drawing.js';

const randomWordList = [ 'Rifle', 'Butter', 'Vase', 'Tail',  'Stream', 'Shoe',  'Library', 'Thumb', 'Baby', 'Yard', 'Jeans', 'Rice',
'Quilt', 'Crown', 'Son', 'Tax', 'Swing', 'Needle', 'Grapes', 'Doctor', 'Grass', 'Van', 'Basketball', 'Wool', 'Milk', 'Dress', 'Friction', 'Cake',
'Soup', 'Fog', 'Toothpaste',  'Money',  'Corn', 'Hammer', 'Grandmother', 'Fangs', 'Vacation', 'Cheese']

const sportsWordList = ['Basketball', 'Baseball', 'Touchdown', 'Goal', 'Homerun','Field Goal', 'Team', 'Penalty', 'Foul', 'Goalie', 'Pitcher',
'Catcher', 'Teferee', 'Bad Call', 'Free Kick', 'Free Throw', 'Fans', 'NBA', 'NFL', 'NHL', 'MLS', 'Champions', 'Winners', 'Losers', 'Field', 'Court',
'Ball', 'Grand Slam', 'Hail Mary', 'Tennis', 'Olympics', 'FIFA', 'Rookie', 'Commentators', 'Stadium', 'Home Game']

const artsWordList = ['Monet', 'Impressionism', 'Starry Night', 'Salvador Dali', 'Baroque', 'Abstract', 'Expressionism', 'Abstract Expressionism', 'Renaissance',
'Scuplture', 'Theater', 'Movie', 'Oscars', 'Easel', 'Paintbrush', 'Canvas', 'Brocade', 'Screenplay', 'Author', 'Writing', 'Museum', 'Frame', 'Camera', 'Photo', 'Natuaralism',
'Ceramis', 'Choreography', 'Ballet', 'Conductor', 'Opera', 'Concert', 'Orchestra', 'Monologue', 'Classicism', 'Collage', 'Costume', 'Cubism', 'Grotesque', 'Performance', 'Director',
'Actor', 'Exhibit', 'Mona Lisa', 'Van Gogh']

const animalWordList = ['Cow', 'Dog', 'Chicken', 'Starfish', 'Octopus', 'Whale','Jellyfish', 'Bee', 'Horse', 'Zebra', 'Pig', 'Cat', 'Deer', 'Raccoon', 'Possum', 'Coyote', 'Wolf', 'Bear',
'Dik-Dik', 'Lion', 'Tiger', 'Eagle', 'Hawk', 'Bird', 'Robin', 'Greyhound', 'Zoo', 'Farm', 'Koala', 'Kangaroo', 'Spider', 'Beetle', 'Ant', 'Bug', 'Shark', 'Mouse', 'Rat', 'Rodent',
'Weasel', 'Otter', 'Beaver', 'Fish', 'Rabbit', 'Fox', 'Egg', 'Gazelle', 'Lemur', 'Elephant', 'Baboon', 'Chimpanzee', 'Gorilla', 'Monkey', 'Toucan', 'Giraffe', 'Hyena', 'Snake', 'Lizard',
'Steak', 'Bull', 'Pigeon']

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
    this.judgeAlert(categoryList);
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

  judgeAlert(categoryList) {
    const judge = this.getJudge(this.state.playerInfo);
    Alert.alert(
      judge.name + ' is the current judge',
      '',
      [
        {text: 'Start!', onPress: () => this.props.navigation.navigate('Drawing',
        {list: categoryList, playerInfo: this.state.playerInfo})},
      ],
      { cancelable: false }
    )
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
