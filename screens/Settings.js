import React from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground
        source={require('./img/paint_splatters.jpg')}
        imageStyle={{resizeMode: 'stretch'}}
        style={{flex: 1}}
      >
        <View style = {styles.container}>
          <Button
            title="Home Screen"
            color="gray"
            accessibilityLabel="Return to the home screen."
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              this.props.navigation.navigate('Home', {
              });
            }}
          />
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
