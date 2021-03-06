// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, SectionList, TouchableHighlight, ToastAndroid, Text } from 'react-native';
import fetchAgenda from '../../../../services/agenda/actions';
import AgendaDayHeader from './AgendaDayHeader';
import AgendaEmpty from './AgendaEmpty';
import type {
  AgendaDay,
  AgendaEventCategory,
  Venue,
} from '../../../../services/agenda/types';
import AgendaFooter from './AgendaFooter';
import AgendaHeader from './AgendaHeader';
import AgendaItem from './AgendaItem';
import style from './style';
import { white } from '../../../../theme/colors';
import { fetchTickets } from '../../../../services/tickets/actions';

function dayToSection(agendaDay) {
  return { ...agendaDay, key: agendaDay._id, data: sortEvents(agendaDay.events) };
}

function sortEvents(agendaEvents){
  agendaEvents.sort((s1, s2) => {
    var t1 = new Date(s1.startTime);
    var t2 = new Date(s2.startTime);
    return t1.getTime() - t2.getTime()});

  return agendaEvents;
}

function sortEvent(agendaDay){
  agendaDay.data = agendaDay.data.sort((s1, s2) => {
    var t1 = new Date(s1.startTime);
    var t2 = new Date(s2.startTime);
    return t1.getTime() - t2.getTime()});

  return agendaDay;
}

function renderAgendaItem(agendaEvent, eventCategories, onSelect) {
  const onSelectFn = onSelect ? () => onSelect(agendaEvent) : null;
  return (
    <View>
      <AgendaItem
        agendaEvent={agendaEvent}
        color={agendaEvent.category ? agendaEvent.category.color : white}
      />
      <TouchableHighlight
        style={style.agendaItemTouchable}
        underlayColor="rgba(255, 255, 255, 0.4)"
        onPress={onSelectFn}
      >
        <View />
      </TouchableHighlight>
    </View>
  );
}

type AgendaProps = {
  agenda: AgendaDay[],
  categories: {[id: string]: AgendaEventCategory},
  venues: {[id: string]: Venue},
  refreshing: boolean,
  loadAgenda: () => void,
  onItemSelect: (agendaEventId: string) => void;
};

state = {
  data: [],
  key: [],
}

class AgendaList extends React.Component<void, AgendaProps, void> {
  componentWillMount() {
    this.props.loadAgenda();
    this.props.loadTickets();
  }

  createSections(agendaDays, eventCategories, venues) {
    if(agendaDays===undefined)
    {
      return [];
    }
  
  
    const sectionsRet = agendaDays.map(dayToSection)
    const sections = sectionsRet.map(sortEvent)
    // ToastAndroid.show(Object.entries(sections[0]).toString(), ToastAndroid.SHORT);
    
    // if (sections.length) {
    //   sections[0].first = true
    // }
    // for (let i = 0; i < sections.length; i += 1) {
    //   const s = sections[i];
    //   for (let j = 0; j < s.events.length; j += 1) {
    //     const ev = s.events[j];
    //     if (ev.category) {
    //       ev.color = ev.category.color;
    //     }
    //     if (ev.venue) {
    //       ev.venue = venues[ev.venue];
    //     }
    //   }
    // }
    const retVal = sections.map(sortEvent);
    // this.setState({data: ["done"]})
    return retVal;
  }

  render() {
    const {
      agenda, venues, loadAgenda, refreshing, onItemSelect,
    } = this.props;
    const isEmpty = agenda == null || agenda.length === 0;

    const categories = null

    const agendaConst = agenda.agenda ? this.createSections(agenda.agenda.agendaDays, categories, venues) : [];

    return (
      <View>
      <SectionList
        renderItem={({ item }) => renderAgendaItem(item, categories, onItemSelect)}
        keyExtractor={item => item._id}
        renderSectionHeader={({ section: agendaDay }) => <AgendaDayHeader agendaDay={agendaDay} />}
        ListHeaderComponent={AgendaHeader}
        ListFooterComponent={() => (isEmpty ? null : <AgendaFooter />)}
        ListEmptyComponent={() => refreshing ? null: <AgendaEmpty type={"Agenda"}/> }
        sections={agendaConst}
        onRefresh={loadAgenda}
        refreshing={refreshing}
      />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  agenda: state.agenda ? state.agenda : {},
  refreshing: state.agenda.fetching,
});

const mapDispatchToProps = dispatch => ({
  loadAgenda: () => dispatch(fetchAgenda()),
  loadTickets: () => dispatch(fetchTickets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);
