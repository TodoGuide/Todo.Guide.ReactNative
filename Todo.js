import React from 'react';
import { TouchableHighlight, View, Text, Button } from 'react-native';
import Swipeout from 'react-native-swipeout';

colorForEstimate = {
    5:'#CADBF7',
    30:'#D9EAD4',
    60:'#FBE4CE',
    240:'#E4B8AF'
}
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
          <View style={{paddingTop: this.props.estimate/4, paddingBottom: this.props.estimate/4, margin: 2, padding:5, borderRadius:4, backgroundColor: colorForEstimate[this.props.estimate]}}>
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