// @flow

import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'native-base';
import { primaryColor, white, newPink, newGreen, black, mediumGray } from '../../../../../theme/colors';
import { safeAreaTop } from '../../../../../theme/native-base-theme/variables/commonColor';
import { connect } from 'react-redux';
import HeaderBackButton from '../../../../../components/HeaderBackButton';
import { style } from "../TicketBlock";
import Modal from "react-native-modal";
import * as styleButton from '../TicketGet';
import { CreditCardInput } from "react-native-credit-card-input";
import ticket from './assets/tickets.png';
import ticketBack from './assets/tickets_back.png';


type TicketGetState = {
  available: boolean,
  url: string,
  loading: boolean,
}

const styleLocal = StyleSheet.create({
  top: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: white
  },
  spacer: {
    width: '100%',
    borderTopWidth: 2,
    borderTopColor: white,
  },
  total: {
    width: '100%',
    textAlign: "right",
    paddingRight: 10,
    color: white,
    fontWeight: "bold",
    fontSize: 20
  },
  modal: {
    backgroundColor: newPink,
    borderRadius: 5,
    borderColor: white,
    borderWidth: 1,
    padding: 10
  }
});

function generateInputs(data: Array) {
  let returnElements = []
  data.forEach(element => {
    returnElements.push(
      <View style={{ padding: 5 }}>
        <View style={styleLocal.top}>
          <Text style={style.price}>{element.ticket}</Text>
          <Text style={style.price}>£{element.price}</Text>
        </View>
        <Text style={style.price}>- {element.name}</Text>
        <Text style={style.price}>- {element.email}</Text>
      </View>
    )
  })
  return returnElements;
}

export class TicketSummary extends React.Component<void, void, TicketGetState> {

  state = { isVisible: false, valid: false }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: newGreen,
      height: safeAreaTop + 44,
      paddingTop: safeAreaTop,
    },
    headerTitle: 'Summary',
    headerTitleStyle: {
      fontFamily: 'Source Sans Pro SemiBold',
      color: white
    },
    headerLeft: (
      <HeaderBackButton
        title="Back"
        color={primaryColor}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  submitPayment() {
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.state.params.data.tickets
    const total = navigation.state.params.data.total
    return (
      <View>
        <ScrollView style={[{ backgroundColor: newPink, height: '100%' }]}>
          {generateInputs(data)}
          <View style={styleLocal.spacer} />
          <Text style={styleLocal.total}>Total:  £{total}</Text>
          <Button
            light
            rounded
            style={styleButton.style.continue}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          >
            <Text style={styleButton.style.text}>Pay Now!</Text>
          </Button>
        </ScrollView>
        <Modal isVisible={this.state.isVisible} >
          <View style={[styleLocal.modal, {display: "flex", justifyContent: 'center', height: '65%'}]}>
            <CreditCardInput fontFamily={{ color: white }} requiresName={true} labelStyle={{ color: black }} placeholderColor={'white'} cardImageFront={ticket}
              cardImageBack={ticketBack} onChange={(data) => {
                let {valid, values} = data;
                this.setState({cardData: values, valid: valid})
              }
              }/>
            <Button
              light
              rounded
              style={this.state.valid ? styleButton.style.continue : styleButton.style.disabledContinue}
              disabled={!this.state.valid}
              onPress={() => this.submitPayment()}
            >
              <Text style={[styleButton.style.text]}>Pay £{total}</Text>
            </Button>
            <Button
              rounded
              style={[styleButton.style.cancel]}
              onPress={() => this.setState({ isVisible: !this.state.isVisible })}
            >
              <Text style={[styleButton.style.cancelText]}>Cancel</Text>
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teamMembers: null,
});


export default connect(mapStateToProps)(TicketSummary);