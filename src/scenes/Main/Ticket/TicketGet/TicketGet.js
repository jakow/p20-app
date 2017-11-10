// @flow

import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { Button, Spinner } from 'native-base';
import HeaderBackButton from '../../../../components/HeaderBackButton';
import { getTicketAvailability } from '../../../../services/tickets/actions';
import { primaryColor, backgroundGray, mediumGray, white } from '../../../../theme/colors';
import typography from '../../../../theme/typography';


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
    backgroundColor: backgroundGray,
  },
  infoText: {
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
  }
});

export default class TicketGet extends React.Component<void, void, TicketGetState> {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: white,
    },
    headerTitle: 'Get your ticket',
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

  state = {
    loading: true,
    url: '',
    available: false,
  };


  componentDidMount() {
    this.getAvailability();
  }

  componentWillUnmount() {
    this.cancel = true;
  }

  async getAvailability() {
    try {
      const availability = await getTicketAvailability();
      if (!this.cancel) {
        this.setState({ ...availability, loading: false });
      }
    } catch (e) {
      if (!this.cancel) {
        this.setState({ available: false, loading: false });
      }
    }
  }

  cancel = false;

  openTicketPage = () => {
    Linking.openURL(this.state.url);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={style.container}>
          <Spinner color={mediumGray} />
        </View>
      );
    } else if (this.state.available) {
      return (
        <View style={style.container}>
          <Text style={[typography.title2, style.infoText]}>Tickets are available!</Text>
          <Button
            style={style.button}
            onPress={this.openTicketPage}
          >
            <Text style={[typography.body, { color: white }]}>Get your ticket</Text>
          </Button>
        </View>
      );
    }
    return (
      <View style={style.container}>
        <Text style={[typography.title2, style.infoText]}>
          Tickets are not available at this time.
        </Text>
      </View>
    );
  }
}
