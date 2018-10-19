/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput, Button, SafeAreaView} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import firebase from 'react-native-firebase';
import Todo from './Todo'; // we'll create this next
import TodoWizard from './TodoWizard'; // we'll create this next


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const orderTodos = function (todos) {
  let todayTodos = []
  let weekTodos = []
  let monthTodos = []
  for(let todo of todos) {
    if(todo.complete) {
      continue;
    }
    console.log(todo)
    switch(todo.priority) {
      case 'today':
        todayTodos.push(todo)
        break;
      case 'week':
        weekTodos.push(todo)
        break;
      case 'month':
        monthTodos.push(todo)
        break;
    }
  }
  console.log(todayTodos)
  console.log(weekTodos)
  console.log(monthTodos)
  return todayTodos.concat(weekTodos).concat(monthTodos)
}
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
      const { title, complete, priority, estimate } = doc.data();
      todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
        priority,
        estimate
      });
    });
    this.setState({ 
      todos: orderTodos(todos),
      loading: false,
   });
  }
  
  updateTextInput(value) {
    this.setState({ textInput: value });
  }

  addTodo(todo) {
    this.ref.add(todo);
  }

  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
      <SafeAreaView style={{ flex: 1}}>
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <Todo key={item.key} {...item} />}
        />
        <TodoWizard addTodo={(todo) => this.addTodo(todo)}/>
      </SafeAreaView>
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
