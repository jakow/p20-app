import React from 'react';
import { View } from 'react-native';
import AgendaList from './AgendaList';
import style from './style';

export default class AgendaListScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Agenda',
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <AgendaList
          onItemSelect={event => navigation.navigate('Detail', { id: event._id })}
        />
      </View>
    );
  }
}
