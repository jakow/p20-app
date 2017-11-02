// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Alert, Image, Modal, ScrollView, View, KeyboardAvoidingView, StyleSheet, Vibration } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { Button, Form, Item, Label, Text, Input } from 'native-base';
import { VALID_CODE_REGEX } from '../../../../services/tickets/constants';
import updateData from '../../../../services/tickets/actions';
import ticketStyles from '../style';
import typography from '../../../../theme/typography';
import { mediumGray } from '../../../../theme/colors';
import ModalHeader from '../../../../components/ModalHeader';
import reticle from '../assets/reticle.png';

type TicketEnterProps = {
  updateData: ({ email?: string, ticketId?: string }) => void,
  email: string;
  ticketId: string;
  valid: boolean,
};

type TicketEnterState = {
  showModal: boolean,
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 40,
  },
  or: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    color: mediumGray,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 20 + 15,
    right: 15,
  },
  closeButtonFill: {
    borderRadius: 6,
    padding: 12,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  reticle: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    width: 240,
    height: 240,
    marginTop: -120,
    marginLeft: -120,
  },
});

type BarCodeScanResult = {
  data: string,
};

class TicketEnter extends React.Component<void, TicketEnterProps, TicketEnterState> {
  state = {
    showModal: false,
  };

  onScanCodeSuccess = ({ data }: BarCodeScanResult) => {
    if (VALID_CODE_REGEX.test(data)) {
      Vibration.vibrate(150);
      this.setState({ showModal: false });
      this.props.updateData({ ticketId: data });
    }
  }

  openScanner = async () => {
    const existingPermissions = await Permissions.getAsync(Permissions.CAMERA);
    let { status } = existingPermissions;
    if (status !== 'granted') {
      const { status: newStatus } = await Permissions.askASync(Permissions.CAMERA);
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
      <KeyboardAvoidingView style={ticketStyles.ticketEnterContainer}>
        <ScrollView>
          <Text style={[typography.body, ticketStyles.ticketEnterInfoText]}>
            Enter your details exactly as on your ticket:
          </Text>
          <Form style={styles.form}>

            <Item floatingLabel>
              <Label>Ticket ID</Label>
              <Input
                keyboardType="numeric"
                onChangeText={text => this.props.updateData({ ticketId: text })}
                value={this.props.ticketId}
              />
            </Item>
            <Text style={[typography.title2, styles.or]}>OR</Text>
            <Button
              primary
              style={styles.button}
              onPress={this.openScanner}
            >
              <Text>
                Scan your ticket
              </Text>
            </Button>
            <Item floatingLabel>
              <Label>E-mail</Label>
              <Input
                onChangeText={text => this.props.updateData({ email: text })}
                value={this.props.email}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </Item>
          </Form>
        </ScrollView>
        <Modal
          animationType="slide"
          visible={this.state.showModal}
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
            <Image source={reticle} style={styles.reticle} />
          </View>
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.ticketForm.email,
    ticketId: state.ticketForm.ticketId,
    valid: state.ticketForm.valid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateData: data => dispatch(updateData(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketEnter);
