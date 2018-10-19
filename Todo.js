import React from 'react';
import { TouchableHighlight, View, Text, Button } from 'react-native';
import Swipeout from 'react-native-swipeout';
export default class Todo extends React.PureComponent {
    // toggle a todo as completed or not via update()
    toggleComplete() {
        this.props.doc.ref.update({
            complete: !this.props.complete,
        });
    }

    render() {
        const swipeoutBtns = [
            {
                type: 'primary',
                text: 'Completed'
            },
            {
                type: 'delete',
                text: 'Delete'
            }
        ]
        return (
          <View style={{margin: 5, padding:0, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#dddddd'}}>
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 8 }}>
                      <Text>{this.props.title}</Text>
                  </View>
                  <Button style={{ flex: 2 }} title={'Complete'} onPress={() => this.toggleComplete()}>
                      {!this.props.complete && (
                          <Text>COMPLETE</Text>
                      )}
                  </Button>
              </View>
          </View>
        );
    }
}