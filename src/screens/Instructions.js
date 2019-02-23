import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, AppState, BackHandler} from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

export default class Instructions extends Component {
  render () {
    return (
      <View style={styles.container}>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(236, 240, 241, 1.0)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 40,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(189, 195, 199, 1.0)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 30,
  }
});
