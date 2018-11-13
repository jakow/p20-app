import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { primaryColor, white } from '../../../theme/colors';
import HeaderBackButton from '../../../components/HeaderBackButton';
import QuestionsList from './QuestionsList';
// import style from './style';

export default class QuestionsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: white,
      height: 44,
    },
    headerTitle: 'Questions',
    headerTitleStyle: {
      fontFamily: 'Source Sans Pro SemiBold',
    },
    headerLeft: (
      <HeaderBackButton
        title="Back"
        color={primaryColor}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  render() {
    const { navigation } = this.props;

    return (
      <QuestionsList
        onItemSelect={event => {navigation.navigate('QuestionsAsk')}}
      />
    );
  }
}
