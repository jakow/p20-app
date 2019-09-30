// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Linking, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Spinner } from 'native-base';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { getTicketAvailability } from '../../../../services/tickets/actions';
import { primaryColor, backgroundGray, mediumGray, white, newPink, newGreen, black } from '../../../../theme/colors';
import typography from '../../../../theme/typography';
import { safeAreaTop } from '../../../../theme/native-base-theme/variables/commonColor';
import TicketBlock from "./TicketBlock";


type TicketGetState = {
   available: boolean,
   url: string,
   loading: boolean,
}

export const style = StyleSheet.create({
   container: {
      backgroundColor: newPink,
   },
   buttonContainer: {
      flex: 1,
      alignItems: 'center',
   },
   continue: {
      flex: 1,
      width: '90%',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 15,
      marginBottom: 15,
      backgroundColor: newGreen,
   },
   disabledContinue: {
      flex: 1,
      width: '90%',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 15,
      marginBottom: 15,
      backgroundColor: `rgba(102, 187, 145, 0.7)`,
   },
   cancel: {
      flex: 1,
      width: '90%',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 0,
      marginBottom: 15,
      backgroundColor: white,
   },
   text: {
      color: white,
   },
   cancelText: {
      color: black
   }
});


export class TicketGet extends React.Component<void, void, TicketGetState> {

   state = {}

   static navigationOptions = ({ navigation }) => ({
      headerStyle: {
         backgroundColor: newGreen,
         height: safeAreaTop + 44,
         paddingTop: safeAreaTop,
      },
      headerTitle: 'Get your ticket',
      headerTitleStyle: {
         fontFamily: 'Source Sans Pro SemiBold',
         color: white,
      },
      headerLeft: (
         <HeaderBackButton
            title="Back"
            color={primaryColor}
            onPress={() => navigation.goBack()}
         />
      ),
   });

   generateTicket() {
      let arr = []
      this.props.tickets.forEach((element, index) => {
         if(element.quantity > 0){
            arr.push(<TicketBlock key={element._id} element={index%5} data={element} onChange={this.changeAmountOfTicket.bind(this)} />)
         }
      });
      return arr;
   }

   changeAmountOfTicket(id, amount) {
      if(amount <= 0) {
         let state = this.state;
         delete state[id]
         this.setState(state)
      } else {
         this.setState({ [id]: amount });
      }
   }

   sumTotal() {
      let keys = Object.keys(this.state)
      let total = 0
      keys.forEach(key => total = total + this.state[key])
      return total
   }

   render() {
      const { navigation } = this.props;
      return (
         <ScrollView contentContainerStyle={{ justifyContent: 'center' }} style={style.container}>
            {this.generateTicket()}
            <View style={style.buttonContainer}>
               <Button
                  light
                  rounded
                  style={style.continue}
                  //disabled={Object.keys(this.state).length == 0}
                  onPress={() => {
                     /*Object.keys(this.state).length != 0 ?*/ navigation.navigate("TicketEmails", { data: this.state, amount: this.sumTotal() }) /*: null*/}
                  }
               >
                  <Text style={style.text}>Continue</Text>
               </Button>
            </View>
         </ScrollView>
      );
   }
}

function mapStateToProps(state) {
   return {
      tickets: state.agenda.tickets,
   };
}

export default connect(mapStateToProps)(TicketGet);