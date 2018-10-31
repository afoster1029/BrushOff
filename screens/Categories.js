import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';


//import Drawing from '/Users/johnpellegrini/BrushOff/screens/Drawing.js';

const randomWordList = [ 'rifle', 'butter', 'vase', 'tail',  'stream', 'shoe',  'library', 'thumb', 'baby', 'yard', 'jeans', 'rice',
'quilt', 'crown', 'son', 'tax', 'swing', 'needle', 'grapes', 'doctor', 'grass', 'van', 'basketball', 'wool', 'milk', 'dress', 'horse', 'cow', 'friction', 'cake',
'soup', 'fog', 'toothpaste',  'money',  'corn', 'hammer', 'grandmother', 'fangs', 'vacation', 'cheese']

const sportsWordList = ['basketball', 'baseball', 'touchdown', 'goal', 'homerun']

const artsWordList = ['Monet', 'Impressionism', 'Starry Night', 'Salvador Dali', ]

const animalWordList = ['cow', 'dog', 'chicken', 'starfish', 'octopus', 'whale','jellyfish','bee']

export default class CategoriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    list: randomWordList
  };
}



  static navigationOptions = {
    title: 'Categories'
  };

  getValue() {
    return this.state.list
  }

  sportsCategory() {
    this.setState({
      list: sportsWordList
    });
    //console.log(this.state.list);
    this.props.navigation.navigate('Drawing', {list : this.state.list
    });
  };

  artCategory() {
    this.setState({
      list: artsWordList
    });
    //console.log(this.state.list);
    this.props.navigation.navigate('Drawing', {
    });
  };

  animalCategory() {
    this.setState({
      list: animalWordList
    });
    //console.log(this.state.list);
    this.props.navigation.navigate('Drawing', {
    });
  };

  randomCategory() {
    this.setState({
      list: randomWordList
    });
    //console.log(this.state.list);
    this.props.navigation.navigate('Drawing', {
    });
  };


  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style = {styles.container}>
        <Button
          title="Sports"
          onPress={() => {
            {this.sportsCategory()}
          }}

        />
        <Button
          title="Art"
          onPress={() => {
            {this.artCategory()}
          }}

        />
        <Button
          title="Animals"
          onPress={() => {
            {this.animalCategory()}
          }}
        />
        <Button
          title="Random"
          onPress={() => {
            {this.randomCategory()}
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
