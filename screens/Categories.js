import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
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
    const players = this.props.navigation.getParam('playerList', 'nothing passed');
    console.log(players);
    this.state = {
      playerList: players
  };
}

  static navigationOptions = {
    title: 'Categories'
  };

  getValue() {
    return this.state.list
  }

  navigateToDrawing(categoryList) {
    this.props.navigation.navigate('Drawing', {list: categoryList, playerList: this.state.playerList});
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
          <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
            <View style={{width: 80, height: 45}} >
              <Button
                title="Sports"
                color="black"
                onPress={() => {
                  {this.navigateToDrawing(sportsWordList)}
                }}

              />
            </View>

            <View style={{width: 50, height: 50}} >
              <Button
                title="Art"
                color="black"
                onPress={() => {
                  {this.navigateToDrawing(artsWordList)}
                }}

              />
            </View>

            <View style={{width: 98, height: 50}} >
              <Button
                title="Animals"
                color="black"
                onPress={() => {
                  {this.navigateToDrawing(animalWordList)}
                }}
              />
            </View>

            <View style={{width: 98, height: 50}} >
              <Button
                title="Random"
                color="black"
                onPress={() => {
                  {this.navigateToDrawing(randomWordList)}
                }}
              />
            </View>

          </View>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
