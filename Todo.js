import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
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
          <Swipeout style={{margin: 5, padding:0, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#dddddd'}}right={swipeoutBtns} autoClose={true} backgroundColor={'white'}>
              <View style={{ flex: 1, height: 48, flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 8 }}>
                      <Text>{this.props.title}</Text>
                  </View>
                  <View style={{ flex: 2 }}>
                      {this.props.complete && (
                          <Text>COMPLETE</Text>
                      )}
                  </View>
              </View>
          </Swipeout>
        );
    }
}