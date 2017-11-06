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
  onPress = () => {
    const { dispatch, onSuccess, onFailure } = this.props;
    dispatch(findTicket(onSuccess, onFailure));
  }

  render() {
    return (
      <HeaderRightButton
        disabled={this.props.disabled}
        onPress={this.onPress}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    disabled: !state.ticketForm.valid,
  };
}

export default connect(mapStateToProps)(TicketEnterNextButton);
