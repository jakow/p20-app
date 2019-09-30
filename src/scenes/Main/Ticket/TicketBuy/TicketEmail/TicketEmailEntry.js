import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Input, Icon, Row } from 'native-base';
import { primaryColor, white, newPink, newGreen, lightGray, mediumGray } from '../../../../../theme/colors';
import { safeAreaTop } from '../../../../../theme/native-base-theme/variables/commonColor';
import { connect } from 'react-redux';
import HeaderBackButton from '../../../../../components/HeaderBackButton';
import * as blockStyle from "../TicketBlock";

export const style = StyleSheet.create({
   input: {
      color: white,
   },
   wrongInput: {
      borderColor: 'red',
      borderWidth: 2
   },
   icon: {
      color: white,
   },
   iconWrapper: {
      display: "flex",
      marginRight: 5,
      marginLeft: 10,
      justifyContent: "center",
   },
   wrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
   },
   wrapperMar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      marginBottom: 5
   }
})

export function validateEmail(email) {
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

export function validateName(name) {
   if(name == null || name == '') {
      return false
   }
   return true
}


export default class TicketEmailEntry extends React.Component {
   render() {
      return (
         <View style={[blockStyle.style.container, blockStyle.style['background' + this.props.index]]}>
            <Text style={blockStyle.style.infoText}>{this.props.title}</Text>
            <View>
               <View style={this.props.data ? validateName(this.props.data.name) ? style.wrapperMar : [style.wrapperMar, style.wrongInput] : style.wrapperMar}>
                  <View style={style.iconWrapper}>
                     <Icon name='person' style={style.icon} />
                  </View>
                  <Input
                     style={[style.input]}
                     placeholder="Name and Surname"
                     placeholderTextColor={mediumGray}
                     numberOfLines={1} multiline={false}
                     maxlength={50}
                     onChangeText={(text) => { this.props.updateName(this.props.id, text, this.props.ticketId) }}
                     value={this.props.data ? this.props.data.name : null}
                     autoCapitalize='words'
                  />
               </View>
               <View style={this.props.data ? validateEmail(this.props.data.email) ? style.wrapper : [style.wrapper, style.wrongInput] : style.wrapper}>
                  <View style={style.iconWrapper}>
                     <Icon name='mail' style={style.icon} />
                  </View>
                  <Input
                     style={style.input}
                     placeholder="E-mail"
                     keyboardType='email-address'
                     placeholderTextColor={mediumGray}
                     numberOfLines={1} multiline={false}
                     maxlength={50}
                     onChangeText={(text) => this.props.updateEmail(this.props.id, text, this.props.ticketId)}
                     value={this.props.data ? this.props.data.email : null}
                     autoCapitalize='none'
                     autoCorrect={false}
                  />
               </View>
            </View>
         </View>
      )
   }
}