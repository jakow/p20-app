// @flow

import React from 'react';
import { Linking, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import {  Spinner } from 'native-base';
import { primaryColor, backgroundGray, mediumGray, white, newPink, newGreen, newBlue, newAzure, newViolet, newBlueLight, black } from '../../../../theme/colors';
// import TicketBenefitList from './TicketBenefitList';
import typography from '../../../../theme/typography';
import TicketPrice from "./TIcketPrice";
import checkIcon from '../assets/check-mark.png'
import { bold } from 'ansi-colors';

export const style = StyleSheet.create({
   container: {
      paddingVertical: 24,
      paddingHorizontal: 12,
      margin: "4%",
      marginBottom: 0,
      borderRadius: 5
   },
   background0: {
      borderWidth: 1,
      borderColor: white,
   },
   background1:{
      backgroundColor: newBlue,
   },
   backgroundDarker1:{
      backgroundColor: newBlueLight,
   },
   background2:{
      backgroundColor: newGreen,
   },
   background3:{
      backgroundColor: newAzure,
   },
   background4:{
      backgroundColor: newViolet,
   },
   infoText: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontSize: 24,
      color: white,
   },
   infoTextSmall: {
      fontSize: 18,
      marginBottom: 20,
      color: white,
   },
   button: {
      alignSelf: 'center',
      borderColor: white,
      borderWidth: 2,
      borderRadius: 25,
      width: 10
   },
   bottom:{
      display: "flex",
      flexDirection: 'column',
      width: "100%",
      flexWrap: 'wrap',
      height: 100,
   },
   prices: {
      flexGrow: 1,
      alignItems:"center",
      
   },
   price: {
      margin: 10,
      fontSize: 14,
      color: white
   },
   benefits: {
      textAlign: "center",
      marginBottom: 20,
      width: '100%',
   },
   benefitMain:{
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
      marginTop: 5,
   },
   benefit: {
      color: white,
      fontSize: 14,
      marginLeft: 5,
      width: '100%',
      margin: 0,
      padding: 0
   },
   buttons:{
      flex: 1,
      display: "flex",
      flexDirection: 'row',
      alignItems:"center",
      justifyContent: "space-between",
   },
   checkIcon: {
      height: 15,
      width: 15,
   },
   input: {
      width: '100%',
      justifyContent: 'center',
      backgroundColor: white,
      marginTop: 10
    },
});

export default class TicketBlock extends React.Component<void, void, TicketGetState> {

   state = {
      amount: 0
   }

   componentDidMount() {
   }

   componentWillUnmount() {
   }

   openTicketPage = () => {
   }

   renderItems = (items: Array) => {
      let retArr = [];
      items.forEach((element, key) => {
         retArr.push(<Text key={key} style={style.benefit}>
            {`${element}`}
         </Text>)
      });
      return retArr;
   }

   generateBenefits(x: String) {
      return this.renderItems(x.replace(/\)/g, '),').split(','))
   }

   updateAmount(amount) {
      this.setState({amount: amount})
      this.props.onChange(this.props.data._id, amount)
   }


   render() {
      return (
         <View style={[style.container, style['background'+this.props.element]]}>
            <Text style={[style.infoText]}>{this.props.data.name}</Text>
            <View style={[style.benefits]}>{this.generateBenefits(this.props.data.benefits)}</View>
            {this.props.data.description ? <Text style={[style.infoText, typography.body]}>{this.props.data.description}</Text> : null}
            <View>
               <Text style={[ style.infoTextSmall]}>
                  <Text style={{fontWeight: 'bold', fontSize: 22}}>
                     {this.props.data.quantity}
                  </Text> tickets remaining. <Text style={{fontWeight: 'bold', fontSize: 22}}>{this.props.data.warningLimit}</Text> sold in last 24h!</Text>
            </View>
            <TicketPrice price={this.props.data.price} amount={this.state.amount} limit={this.props.data.quantity} onChange={this.updateAmount.bind(this)} color={style['backgroundDarker1']}/>
         </View>
      );
   }
}
