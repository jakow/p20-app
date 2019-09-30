// @flow

import React from 'react';
import { Platform } from 'react-native';
import AgendaDetail from './AgendaDetail';
import { primaryColor, white, backgroundGray, newGreen } from '../../../../theme/colors';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { safeAreaTop } from '../../../../theme/native-base-theme/variables/commonColor';
import { Dimensions, ScrollView, Text, View, } from 'react-native';
import { Button } from 'native-base';
import typography from '../../../../theme/typography';


export default class AgendaDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: newGreen,
      paddingTop: Platform.OS === 'ios' ? safeAreaTop : 0,
      height: 44 + Platform.OS === 'ios' ? safeAreaTop : 40,
    },
    headerTitle: 'Event details',
    headerTitleStyle: {
      fontFamily: 'Source Sans Pro SemiBold',
      color: white
    },
    headerLeft: (
      <HeaderBackButton
        title="Back"
        color={white}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  render() {
    const eventId = this.props.navigation.state.params.id;
    const { navigation } = this.props;

    return (

      <View style={{width: '100%', height: '100%'}}>
        <AgendaDetail eventId={eventId} navi={navigation} />
      </View>
    );
  }
}
