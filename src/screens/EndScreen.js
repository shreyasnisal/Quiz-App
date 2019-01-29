import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, NetInfo, BackHandler, AsyncStorage} from 'react-native';
import  {Content, Container, Header, Row} from 'native-base';

export default class EndScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      score: 0,
    }
  }

  componentDidMount () {
    const score = this.props.navigation.getParam ('score');
    this.setState({
      score: score,
      loading: false,
    })
    BackHandler.addEventListener ('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener ('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate ('Home');
    return true;
  }

  showRank = () => {
    if (this.state.score === 10) {
      return (<Text style={styles.rankText}>Perfect!!</Text>);
    }
    else if (this.state.score > 7) {
      return (<Text style={styles.rankText}>Good Job!</Text>);
    }
    else if (this.score > 5) {
      return (<Text style={styles.rankText}>Average</Text>);
    }
    else if (this.state.score > 1) {
      return (<Text style={styles.rankText}>Better Luck Next Time</Text>);
    }
    else {
      return (<Text style={styles.rankText}>Fail</Text>);
    }
  }

  render () {
    const  {loading, score} = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.textContainer}>
            <Text style={styles.finishedText}>Quiz Finished!</Text>
            <Text style={styles.scoreText}>Your Score: {score}/10</Text>
            {this.showRank()}
          </View>
          <View style={styles.textContainer}>
            <TouchableOpacity style={styles.btnStyle} onPress={() => {this.props.navigation.navigate('Home')}}>
              <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnStyle} onPress={() => {BackHandler.exitApp()}}>
              <Text style={styles.buttonText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'rgba(236, 240, 241, 1.0)',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center'
  },
  finishedText: {
    marginTop: 150,
    marginBottom: 5,
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 24,
  },
  scoreText: {
    marginBottom: 5,
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 34,
  },
  rankText: {
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 34
  },
  btnStyle: {
    backgroundColor: 'rgba(189, 195, 199, 1.0)',
    height: 80,
    width: 200,
    borderRadius: 25,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 30,
  }
});
