import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>

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
