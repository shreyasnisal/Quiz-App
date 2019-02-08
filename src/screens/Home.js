import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Voice from 'react-native-voice';
import Tts from 'react-native-tts';

export default class Home extends Component {

  componentWillMount () {
    this.welcomeMessage ();
  }

  componentDidMount () {
    Tts.setDucking(true);
    // Tts.setDefaultVoice('en-us-x-sfg#female_1-local');
    Tts.addEventListener('tts-finish', (event) => {this.startRecog ()});
    // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  welcomeMessage () {
    var speakText = 'Welcome to the country-capitals quiz application. Click on the Start button, or say start, to begin the quiz';
    Tts.getInitStatus().then(() => {
      Tts.speak(speakText);
    });

  }

  startRecog = () => {
    Voice.start ('en-IN');
  }

  onSpeechResultsHandler (event) {
    var sentence = event.value [0];
    var words = sentence.split (' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i] === 'start' || words[i] === 'begin') {
        this.props.navigation.navigate ('Questions');
      }
    }
  }

  startButton = () => {
    Tts.stop ();
    this.props.navigation.navigate ('Questions');
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Text style = {styles.welcome}>Welcome</Text>
        <TouchableOpacity style = {styles.buttonContainer}
          onPress={() => this.startButton ()}>
          <Text style = {styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    );
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
