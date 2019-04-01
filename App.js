/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './src/screens/Home';
import Instructions from './src/screens/Instructions';
import Questions from './src/screens/Questions';
import EndScreen from './src/screens/EndScreen';

const AppNavigator = createStackNavigator({
  Home:Home,
  Instructions:Instructions,
  Questions:Questions,
  EndScreen:EndScreen
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <AppContainer />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
