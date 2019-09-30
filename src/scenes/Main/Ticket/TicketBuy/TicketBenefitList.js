// @flow

import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Button, Spinner } from 'native-base';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { getTicketAvailability } from '../../../../services/tickets/actions';
import { primaryColor, backgroundGray, mediumGray, white, newPink, newGreen, newBlue } from '../../../../theme/colors';
import typography from '../../../../theme/typography';
import { safeAreaTop } from '../../../../theme/native-base-theme/variables/commonColor';


type TicketGetState = {
   available: boolean,
   url: string,
   loading: boolean,
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 12,
      backgroundColor: newBlue,
   },
   infoText: {
      marginBottom: 20,
   },
   button: {
      alignSelf: 'center',
   }
});

export default class TicketBenefitList extends React.Component<void, void, TicketGetState> {

   state = {
      loading: true,
      url: '',
      available: false,
      warning: false,
   };

   componentDidMount() {
      this.getAvailability();
   }

   componentWillUnmount() {
      this.cancel = true;
   }

   openTicketPage = () => {
      Linking.openURL(this.state.url);
   }

   render() {
      return (
         <View style={style.container}>
            <Text style={[typography.title2, style.infoText]}>Tickets are available!</Text>
            <Text style={[typography.title2, style.infoText]}>Tickets are available!</Text>
            <div>
               { warning ? null : null }
               <Text style={[typography.title2, style.infoText]}>Tickets are available!</Text>
            </div>
            
               <Text style={[typography.body, { color: white }]}>Get your ticket</Text>
         </View>
      );
   }
}
