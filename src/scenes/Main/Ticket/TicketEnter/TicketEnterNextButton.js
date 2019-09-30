// @flow
import React from 'react';
import { connect } from 'react-redux';
import HeaderRightButton from '../../../../components/HeaderRightButton';
import { findTicket } from '../../../../services/tickets/actions';

type TicketEnterNextButtonProps = {
  disabled: boolean,
  onSuccess: () => void,
  onFailure: () => void,
  dispatch: (action: any) => void,
};

class TicketEnterNextButton extends React.Component<void, TicketEnterNextButtonProps, void> {

  render() {
    const { disabled, onPress, onSuccess, onFailure } = this.props;

    const renderButton = () => {
      if(!disabled) {
        return (<HeaderRightButton
          disabled={disabled}
          onPress={() => onPress(onSuccess, onFailure)}
        />)
      } else {
        return null
      }
    }

    return renderButton()
  }
}

function mapStateToProps(state) {
  return {
    disabled: !state.ticketForm.valid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPress: (onSuccess, onFailure) => dispatch(findTicket(onSuccess, onFailure)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketEnterNextButton);
