/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput, Button} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'react-native-firebase';
import Todo from './Todo'; // we'll create this next


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor() {
    super()
    this.ref = firebase.firestore().collection('todos');
    this.state = {
      textInput: '',
      loading: true,
      todos: [],
    };
    this.unsubscribe = null;

  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const todos = [];
    querySnapshot.forEach((doc) => {
      const { title, complete } = doc.data();
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
      });
    });
    this.setState({ 
      todos,
      loading: false,
   });
  }
  
  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addTodo() {
    this.ref.add({
      title: this.state.textInput,
      complete: false,
    });
    this.setState({
      textInput: '',
    });
  }

  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    // Buttons
    const swipeoutBtns = [
      {
        text: 'Completed'
      }
    ]
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <Todo {...item} />}
        />
        <TextInput
          placeholder={'Add TODO'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <Button
          title={'Add TODO'}
          disabled={!this.state.textInput.length}
          onPress={() => this.addTodo()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
