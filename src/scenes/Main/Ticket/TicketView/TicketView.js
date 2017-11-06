// @flow
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { TabViewAnimated, TabViewPagerScroll } from 'react-native-tab-view';
import type { Ticket } from '../../../../services/tickets/types';
import style from './style';
import TicketImage from './TicketImage';
import BulletTabBar from '../../../../components/BulletTabBar';
import AddButton from '../../../../components/AddButton';


type TicketViewProps = {
  tickets: Ticket[],
  onTicketAdd: () => void,
};

type TicketViewState = {
  index: number,
};

class TicketView extends React.Component<void, TicketViewProps, TicketViewState> {
  state = {
    index: 0,
  };

  changeIndex = (index: number) => {
    this.setState({ index });
  }

  tabViewState() {
    return {
      index: this.state.index,
      routes: this.props.tickets.map(t => ({ key: t.identifier, title: t.ticketType })),
    };
  }

  renderScene = (scene: { index: number }) => (
    <View style={style.tab}>
      <TicketImage ticket={this.props.tickets[scene.index]} />
    </View>
  );

  renderFooter = () => {
    if (this.props.tickets.length < 2) {
      return null;
    }
    return (
      <BulletTabBar
        selectedTab={this.state.index}
        numberOfTabs={this.props.tickets.length}
      />
    );
  }

  render() {
    return (
      <View style={style.background}>
        <View style={style.addButtonContainer}>
          <AddButton onPress={this.props.onTicketAdd} />
        </View>
        <View style={style.tabs}>
          <TabViewAnimated
            onIndexChange={this.changeIndex}
            navigationState={this.tabViewState()}
            renderPager={props => <TabViewPagerScroll {...props} style={{ flexGrow: 0 }} />}
            renderScene={this.renderScene}
            renderFooter={this.renderFooter}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
  };
}

export default connect(mapStateToProps)(TicketView);
