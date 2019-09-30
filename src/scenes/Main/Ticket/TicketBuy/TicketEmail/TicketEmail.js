// @flow

import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button } from 'native-base';
import { primaryColor, white, newPink, newGreen } from '../../../../../theme/colors';
import { safeAreaTop } from '../../../../../theme/native-base-theme/variables/commonColor';
import TicketEmailEntry from './TicketEmailEntry';
import { connect } from 'react-redux';
import HeaderBackButton from '../../../../../components/HeaderBackButton';
import * as mainStyle from "../TicketGet";
import { validateEmail, validateName } from "./TicketEmailEntry";

type TicketGetState = {
  available: boolean,
  url: string,
  loading: boolean,
}

export const style = StyleSheet.create({
  total: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    paddingBottom: 0,
  },
  left: {
    color: white,
    fontSize: 20,
  },
  right: {
    color: white,
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export class TicketEmail extends React.Component<void, void, TicketGetState> {

  state = { total: 0 }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: newGreen,
      height: safeAreaTop + 44,
      paddingTop: safeAreaTop,
    },
    headerTitle: 'Checkout',
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
  })

  componentDidMount() {
    let total = 0;
    let data = this.props.navigation.state.params.data;
    this.props.tickets.forEach(element => {
      if (Object.keys(data).includes(element._id)) {
        for (let i = 0; i < data[element._id]; i++) {
          total = total + parseInt(element.price);
        }
      }
    });
    this.setState({ total: total })
  }

  generateInputs(data: Map) {
    let returnElements = []
    let total = 0;
    let iterator = 0;

    this.props.tickets.forEach(element => {
      if (Object.keys(data).includes(element._id)) {
        for (let i = 0; i < data[element._id]; i++) {
          total = total + parseInt(element.price);
          returnElements.push(
            <TicketEmailEntry 
            id={iterator} 
            index={iterator%5}
            data={this.state[iterator]}
            ticketId={element._id}
            updateName={this.updateName.bind(this)} 
            updateEmail={this.updateEmail.bind(this)} 
            title={element.name} />
          )
          iterator = iterator + 1;
        }
      }
    });
    return returnElements;
  }

  updateName(id, name, ticketId) {
    let email = this.state[id] ? this.state[id].email : null;
    this.setState({ [id]: {name: name, email: email, ticketId}});
  }
  updateEmail(id, email, ticketId) {
    let name = this.state[id] ? this.state[id].name : null;
    this.setState({[id]: {email: email, name: name, ticketId}});
  }

  formatData(){
    let ticketKeys = Object.keys(this.state);
    let tickets = [];
    ticketKeys.forEach(element => {
      if(element != 'total') {
        let ticket = this.props.tickets.find(ticket => ticket._id == this.state[element].ticketId)
        tickets.push({
          name: this.state[element].name,
          email: this.state[element].email,
          price: ticket.price,
          ticket: ticket.name
        })
      }
    })
    return {
      tickets: tickets,
      total: this.state.total
    }
  }

  goToNextScreen() {
    const { navigation } = this.props;
    let ticketKeys = Object.keys(this.state);
    let valid = true;
    if(ticketKeys.length == navigation.state.params.amount+1) {
      ticketKeys.forEach(element => {
        if(element != 'total') {
          let ticket = this.state[element]
          if(!validateEmail(ticket.email) || !validateName(ticket.name))
          {
            valid = false;
          }
        }
      })
    } else {
      valid = false
    }
    valid ? navigation.navigate("TicketSummary", { data: this.formatData()}) : null;
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.state.params.data
    return (
      <View>
        <ScrollView style={[{ height: '100%', backgroundColor: newPink }]}>
          {this.generateInputs(data)}
          <View style={style.total}>
            <Text style={style.left}>Total:  </Text>
            <Text style={style.right}>£{this.state.total}</Text>
          </View>
          <Button
            light
            rounded
            style={mainStyle.style.continue}
            onPress={() => this.goToNextScreen()}
          >
            <Text style={mainStyle.style.text}>Continue</Text>
          </Button>
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = state => ({
  tickets: state.agenda.tickets,
});


export default connect(mapStateToProps)(TicketEmail);