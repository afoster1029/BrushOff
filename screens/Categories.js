import React from 'react';
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

  navigateToDrawing(categoryList) {
    this.props.navigation.navigate('Drawing', {list: categoryList});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style = {styles.container}>
        <Text> Select a Category</Text>
        <Button
          title="Sports"
          onPress={() => {
            {this.navigateToDrawing(sportsWordList)}
          }}

        />
        <Button
          title="Art"
          onPress={() => {
            {this.navigateToDrawing(artWordList)}
          }}

        />
        <Button
          title="Animals"
          onPress={() => {
            {this.navigateToDrawing(animalWordList)}
          }}
        />
        <Button
          title="Random"
          onPress={() => {
            {this.navigateToDrawing(randomWordList)}
          }}
        />

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
