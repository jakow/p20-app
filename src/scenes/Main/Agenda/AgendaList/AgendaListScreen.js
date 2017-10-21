import React from 'react';
import { View } from 'react-native';
import AgendaList from './AgendaList';
import style from './style';


export default class AgendaListStreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={style.container}>
        <AgendaList />
      </View>
    );
  }
}
