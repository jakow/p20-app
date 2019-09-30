// @flow

import React from 'react';
import { Linking, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native';
import { Spinner, Right } from 'native-base';
import { primaryColor, backgroundGray, darkGray, mediumGray, white, newPink, newGreen, newBlue, newAzure } from '../../../../theme/colors';
// import TicketBenefitList from './TicketBenefitList';
import typography from '../../../../theme/typography';
import { gray } from 'ansi-colors';

const style = StyleSheet.create({
   container: {
      paddingVertical: 24,
      paddingHorizontal: 12,
      margin: "4%",
      backgroundColor: newBlue,
   },
   infoText: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontSize: 18,
      color: white,
   },
   infoTextSmall: {
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 20,
      color: white,
   },
   button: {
      alignSelf: 'center',
      borderColor: white,
      color: white,
      padding: 2,
      height: 25,
      width: 25,
      borderWidth: 2,
      borderRadius: 25,
   },
   buttonDisabled: {
      alignSelf: 'center',
      borderColor: darkGray,
      color: darkGray,
      padding: 2,
      height: 25,
      width: 25,
      borderWidth: 2,
      borderRadius: 25,
   },
   buttonSign: {
      color: white,
      textAlign: "center",
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 14
   },
   buttonSignDisabled: {
      color: darkGray,
      textAlign: "center",
      marginTop: 'auto',
      marginBottom: 'auto',
      fontSize: 14
   },
   bottom: {
      display: "flex",
      flexDirection: 'row',
      width: "100%",
      flexWrap: 'wrap',
      height: 100,
   },
   prices: {
      flexGrow: 1,
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
   },
   price: {
      margin: 10,
      fontSize: 20,
      color: white,
      flex: 1,
   },
   counter:{
      width: 20,
      marginLeft: 10,
      marginRight: 10,
      fontSize: 20,
      color: white,
      textAlign: "center",
   },
   benefits: {
      flexGrow: 3,
   },
   benefit: {
      color: white,
      margin: 2,
      fontWeight: "bold",
      fontSize: 12
   },
   buttons: {
      flex: 1,
      display: "flex",
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "flex-end",
      marginRight: 10
   },
});

export default class TicketPrice extends React.Component<void, void, TicketGetState> {

   state = {
      amount: 0,
   };

   componentDidMount() {
   }

   componentWillUnmount() {
   }

   openTicketPage = () => {
   }


   render() {
      return (
         <View style={style.prices}>
            <Text style={[style.price]}>Price: <Text style={{fontWeight: 'bold'}}>£{this.props.price}</Text></Text>
            <View style={style.buttons}>
               <TouchableOpacity
                  style={this.props.limit == 0 ? style.buttonDisabled : style.button}
                  disabled={this.props.limit == 0 ? true : false}
                  onPress={() => this.props.amount > 0 ?  this.props.onChange(this.props.amount-1) : null} 
               ><Text style={this.props.limit == 0 ? style.buttonSignDisabled : style.buttonSign} >-</Text></TouchableOpacity>
               <Text style={[style.counter]} >{this.props.amount}</Text>
               <TouchableOpacity
                  style={this.props.limit == 0 ? style.buttonDisabled : style.button}
                  disabled={this.props.limit == 0 ? true : false}
                  onPress={() => this.props.amount < this.props.limit ? this.props.onChange(this.props.amount+1) : null }
               ><Text style={this.props.limit == 0 ? style.buttonSignDisabled : style.buttonSign}>+</Text></TouchableOpacity>
            </View>
         </View>
      );
   }
}
