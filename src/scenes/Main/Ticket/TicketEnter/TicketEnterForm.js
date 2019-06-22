// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Image, Modal, View, Vibration } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Button, Form, Item, Label, Text, Input } from 'native-base';
import { VALID_CODE_REGEX } from '../../../../services/tickets/constants';
import updateData from '../../../../services/tickets/actions';
import style from './style';
import typography from '../../../../theme/typography';
import ModalHeader from '../../../../components/ModalHeader';
import reticle from '../assets/reticle.png';

type BarCodeScanResult = {
  data: string,
};

type TicketEnterProps = {
  updateData: ({ email?: string, ticketId?: string }) => void,
  email: string,
  ticketId: string,
}

type TicketEnterState = {
  showModal: boolean;
};

// eslint-disable-next-line
class TicketEnterForm extends React.Component<void, TicketEnterProps, TicketEnterState> {
  state = {
    showModal: false,
  };

  onScanCodeSuccess = (result: BarCodeScanResult) => {
    if (VALID_CODE_REGEX.test(result.data)) {
      Vibration.vibrate(150);
      this.setState({ showModal: false });
      this.props.updateData({ ticketId: result.data });
    }
  }

  openScanner = async () => {
    const existingPermissions = await Permissions.getAsync(Permissions.CAMERA);
    let { status } = existingPermissions;
    if (status !== 'granted') {
      const { status: newStatus } = await Permissions.askAsync(Permissions.CAMERA);
      status = newStatus;
    }
    if (status !== 'granted') {
      Alert.alert('Cannot scan the QR code', 'You have not given permissions to access the camera.');
      return;
    }
    this.setState({ showModal: true });
  }

  render() {
    return (
      <Form style={style.form}>
        <Text style={[typography.body, style.ticketEnterInfoText]}>
          Enter your details exactly as on your ticket:
        </Text>
        <Item floatingLabel>
          <Label style={{paddingTop: 5}}>Ticket ID</Label>
          <Input
            keyboardType="numeric"
            returnKeyType="next"
            onChangeText={text => this.props.updateData({ ticketId: text })}
            value={this.props.ticketId}
          />
        </Item>
        <Text style={[typography.title2, style.or]}>OR</Text>
        <Button
          primary
          style={style.button}
          onPress={this.openScanner}
        >
          <Text>
              Scan your ticket
          </Text>
        </Button>
        <Item floatingLabel>
          <Label style={{paddingTop: 5}}>E-mail</Label>
          <Input
            onChangeText={text => this.props.updateData({ email: text })}
            value={this.props.email}
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </Item>
        <Modal
          animationType="slide"
          visible={this.state.showModal}
          onRequestClose={() => null}
        >
          <ModalHeader
            title="Scan QR code"
            leftButtonText="Close"
            onLeftButtonPress={() => this.setState({ showModal: false })}
          />
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
              onBarCodeRead={this.onScanCodeSuccess}
              style={{ flex: 1 }}
            />
            <Image source={reticle} style={style.reticle} />
          </View>
        </Modal>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.ticketForm.email,
    ticketId: state.ticketForm.ticketId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateData: data => dispatch(updateData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketEnterForm);
