// In App.js in a new project
import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';
// import colin's stuff
// import 'drawing.js'



class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'BrushOff',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/*<Text>Home Screen</Text>    */}

        <Button
          title="Play!"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('EnterPlayers', {
              itemId: 86,
              otherParam: 'wubba lubba dub dub',
            });
          }}
        />

        <Button
          title="Settings"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Settings', {
              itemId: 86,
              otherParam: 'Settings',
            });
          }}
        />


      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Settings Screen'),
    };
  };
  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/*<Text>Settings Screen</Text>

        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        */}
         <Button
          title="Rick quote"
          onPress={() =>
            // example of how push can override the intial declaration of prop.
            this.props.navigation.navigate('Settings', {
              itemId: Math.floor(Math.random() * 100),
              otherParam: "wubba lubba dub dub",
            })}
        />

        <Button
           title="Morty quote"
           onPress={() => this.props.navigation.setParams({otherParam: 'Awww jeez ricky'})}
         />

        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />

      </View>
    );
  }
}

{/*
class EnterPlayers extends React.Component {
  static navigationOptions = {
    title: 'Players',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {

    const { navigation } = this.props;
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>How many players?</Text>
      </View>
    );
  }
}
*/}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Settings: SettingsScreen
    /*Players: EnterPlayers*/
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
