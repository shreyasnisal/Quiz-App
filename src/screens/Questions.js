import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, NetInfo, BackHandler, AsyncStorage} from 'react-native';
import  { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  {Content, Container, Header, Row} from 'native-base';
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button';
import * as QuestionAction from '../actions/QuestionAction';
import Toast from 'react-native-easy-toast';
import Spinner from 'react-native-loading-spinner-overlay';

class Questions extends Component {

  constructor (props) {
    super(props);
    this.state = {
      loading: true,
      selectedAnswer: '',
      answerVisible: false,
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      score: 0,
      questionNumber: 1,
      radioButtonsActive: true,
      selectedIndex: null,
      questionContainerBackgroundColor: 'rgba (255, 255, 255, 0)',
    };
  }

  componentWillMount () {
    NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
            this.setState({
                loading: false
            }, () => {
                this.refs.toast.show("Could not connect to server")
            })
        } else {
            this.setState({
                loading: true
            }, () => {
                this.props.QuestionAction.getQuestion ();
            })
          }
      });
  }

  componentDidMount () {
    NetInfo.isConnected.fetch().then(isConnected => {
        if (!isConnected) {
            this.setState({
            }, () => {
                this.refs.toast.show("Could not connect to server")
            })
        }
    });
    NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
    BackHandler.addEventListener ('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener ('hardwareBackPress', this.handleBackPress);
  }

  componentWillReceiveProps (next) {
    console.log (next.questionData);
    if (next.questionData) {
        this.setState({
          loading: false,
          question: next.questionData.question,
          option1: next.questionData.option1,
          option2: next.questionData.option2,
          option3: next.questionData.option3,
          option4: next.questionData.option4,
          answer: next.questionData.answer
        }, () => {
            setTimeout(() => {
                this.setState({ loading: false });
            }, 500)
        });
    }
  }

  getQuestion = () => {
    this.setState ({
      loading: true,
    }, () => {
      this.props.QuestionAction.getQuestion ();
    })
  }

  handleBackPress = () => {
      this.setState({ loading: false })
      //modal code goes here
      this.props.navigation.navigate ('Home');
      return true;
  }

  handleFirstConnectivityChange = (isConnected) => {
      if (!isConnected) {
          this.setState({ loading: false });
      } else {
          this.setState({ loading: true });
      }
  }

  submitButton = () => {
    const {score} = this.state;
    if (this.state.radioButtonsActive) {
      if (this.state.selectedAnswer === this.state.answer) {
        this.setState ({
          questionContainerBackgroundColor: 'rgba(46, 204, 113, 1)',
          score: score + 1,
          radioButtonsActive: false,
        })
      }
      else {
        this.setState ({
          questionContainerBackgroundColor: 'rgba(231, 76, 60, 1)',
          answerVisible: true,
          radioButtonsActive: false,
        })
      }
    }
  }

  nextQuestion = () => {
    const {questionNumber} = this.state;
    if (this.state.questionNumber === 10) {
      this.props.navigation.navigate ('EndScreen', {score: this.state.score});
    }
    else {
      this.setState ({
        loading: true,
        selectedIndex: null,
        radioButtonsActive: true,
        questionContainerBackgroundColor: 'rgba(236, 240, 241, 1.0)',
        answerVisible: false,
        questionNumber: questionNumber + 1,
      }, () => {
        this.showAnswer ();
        this.props.QuestionAction.getQuestion();
      })
    }
  }

  showAnswer = () => {
    if (this.state.answerVisible){
      return (
        <View style={styles.correctAnswer}>
          <Text style={styles.answerText}>Answer: {this.state.answer}</Text>
        </View>
      );
    }
  }

  render() {
    const {question, option1, option2, option3, option4, answer, answerVisible, score} = this.state
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Question #{this.state.questionNumber}</Text>
            <Text style={styles.scoreText}>Your Score: {score}</Text>
          </View>
          <View style={[styles.textContainer, {backgroundColor: this.state.questionContainerBackgroundColor}]}>
            <View style={styles.question}>
              <Text style={styles.questionText}>The capital of {question} is:</Text>
            </View>
            <View style={styles.options}>
              <RadioGroup
                selectedIndex={this.state.selectedIndex}
                thickness={2}
                color='#fff'
                activeColor='#67F765'
                style={styles.radioGroup}
                onSelect={(index, value) => {this.setState({selectedAnswer: value, selectedIndex: index})}}>
                <RadioButton value={option1} style={{alignItems: 'center'}} disabled={!this.state.radioButtonsActive}>
                    <Text style={styles.optionText}>{option1}</Text>
                </RadioButton>
                <RadioButton value={option2} style={{alignItems: 'center'}} disabled={!this.state.radioButtonsActive}>
                    <Text style={styles.optionText}>{option2}</Text>
                </RadioButton>
                <RadioButton value={option3} style={{alignItems: 'center'}} disabled={!this.state.radioButtonsActive}>
                    <Text style={styles.optionText}>{option3}</Text>
                </RadioButton>
                <RadioButton value={option4} style={{alignItems: 'center'}} disabled={!this.state.radioButtonsActive}>
                    <Text style={styles.optionText}>{option4}</Text>
                </RadioButton>
              </RadioGroup>
            </View>
            {this.showAnswer()}
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.submitButton} onPress={() => {this.submitButton()}}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.submitButton} onPress={() => {this.nextQuestion()}}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </Content>
        <Spinner visible={this.state.loading} />
        <Toast ref="toast" position="top" />
      </Container>
    );
  }
}

function mapStateToProps(state) {
    return {
      questionData: state.QuestionReducer.questionGetSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
      QuestionAction: bindActionCreators (QuestionAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Questions);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(236, 240, 241, 1.0)',
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginTop: 50
  },
  titleText: {
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 34,
  },
  scoreText: {
    color: 'rgba(44, 62, 80, 1.0)',
    fontSize: 20,
  },
  textContainer: {
    marginTop: 50,
  },
  questionText: {
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 24,
  },
  options: {
    marginTop: 10,
    marginLeft: 20,
  },
  optionText: {
    color: 'rgba(52, 73, 94, 1.0)',
    fontSize: 24,
    marginLeft: 5,
  },
  correctAnswer: {
    marginTop: 20,
    alignItems: 'center'
  },
  answerText: {
    color: '#67F765',
    fontSize: 24,
  },
  submitButton: {
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
