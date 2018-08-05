import React from 'react';
import { View , Text} from 'react-native';
import EmpowerPLInfo from './EmpowerPLInfo';
import style from './style';

export default class EmpowerPLMainScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'EmpowerPL',
  };

  render() {
    const { navigation } = this.props;
    return (
      <EmpowerPLInfo />
    );
  }
}
