import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
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
    this.state = {

  };
}



  static navigationOptions = {
    title: 'Categories'
  };

  getValue() {
    return this.state.list
  }

  sportsCategory() {
    this.props.navigation.navigate('Drawing', {list : sportsWordList
    });
  };

  artCategory() {
    this.props.navigation.navigate('Drawing', {list : artsWordList
    });
  };

  animalCategory() {
    this.props.navigation.navigate('Drawing', {list : animalWordList
    });
  };

  randomCategory() {
    this.props.navigation.navigate('Drawing', {list : randomWordList
    });
  };


  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style = {styles.container}>
        <View style = {{flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
          <View style={{width: 70, height: 40}} >
            <Button
              title="Sports"
              color="black"
              onPress={() => {
                {this.sportsCategory()}
              }}

            />
          </View>

          <View style={{width: 50, height: 50}} >
            <Button
              title="Art"
              color="black"
              onPress={() => {
                {this.artCategory()}
              }}

            />
          </View>

          <View style={{width: 140, height: 50}} >
            <Button
              title="Animals"
              color="black"
              onPress={() => {
                {this.animalCategory()}
              }}
            />
          </View>

          <View style={{width: 140, height: 50}} >
            <Button
              title="Random"
              color="black"
              onPress={() => {
                {this.randomCategory()}
              }}
            />
          </View>

        </View>
      </View>


    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
