import React from 'react';
import { View } from 'react-native';
import AgendaList from './AgendaList';
import style from './style';



export default class AgendaListStreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Agenda',
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={style.container}>
        <AgendaList onItemSelect={event => navigate('Detail', { id: event._id })} />
      </View>
    );
  }
}
