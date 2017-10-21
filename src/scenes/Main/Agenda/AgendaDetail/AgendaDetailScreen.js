import React from 'react';
import { View, Text } from 'react-native';

export default class AgendaListStreen extends React.Component {
  static navigationOptions = {
    header: {
      visible: false,
    }
  }

  render() {
    return (
      <View style={{ padding: 40 }}>
        <Text>Agenda detail</Text>
      </View>
    );
  }
}
