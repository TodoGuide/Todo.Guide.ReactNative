import React from 'react';
import { View, Text, TextInput, InputAccessoryView, TouchableHighlight, StyleSheet, Button } from 'react-native';
export default class TodoWizard extends React.PureComponent {
    // toggle a todo as completed or not via update()
    constructor() {
      super()
      this.state = {}
    }
    setTitle() {
      this.setState({title: this.state.titleInput})
    }
    updateTitle(text) {
      this.setState({titleInput: text})
    }
    setEstimate(minutes) {
      this.setState({estimate: minutes})
    }
    setPriority(priority) {
      this.props.addTodo({title: this.state.title, priority, estimate: this.state.estimate})
      this.setState({title: null, priority: null, estimate: null, textInput: null})
    }

    render() {
      let wizardView = <View/>;
        if(!this.state.title) {
          wizardView = (
            <View style={styles.wizardViewContainer}>
              <TextInput value={this.state.titleInput} onChangeText={(text) => this.updateTitle(text)} placeholder="New Todo"/>
              <TouchableHighlight onPress={() => this.setTitle()}><Text>Next</Text></TouchableHighlight>
            </View>);
        } else if(!this.state.estimate) {
          wizardView = (
            <View style={styles.wizardViewContainer}>
              <TouchableHighlight onPress={() => this.setEstimate(5)}><Text>5 Min</Text></TouchableHighlight>
              <TouchableHighlight onPress={() => this.setEstimate(30)}><Text>30 Min</Text></TouchableHighlight>
              <TouchableHighlight onPress={() => this.setEstimate(60)}><Text>1 hr</Text></TouchableHighlight>
              <TouchableHighlight onPress={() => this.setEstimate(240)}><Text>4 hr</Text></TouchableHighlight>
            </View>);
        } else if(!this.state.priority) {
        wizardView = (
          <View style={styles.wizardViewContainer}>
            <TouchableHighlight onPress={() => this.setPriority('today')}><Text>Today</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => this.setPriority('week')}><Text>This Week</Text></TouchableHighlight>
            <TouchableHighlight onPress={() => this.setPriority('month')}><Text>This Month</Text></TouchableHighlight>
          </View>);
        }
        return (<InputAccessoryView>{wizardView}</InputAccessoryView>)
    }
}

const styles = StyleSheet.create({
  wizardViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee',
    padding: 10
  }
})