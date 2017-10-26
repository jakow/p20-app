// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Text, View, SectionList, TouchableHighlight } from 'react-native';
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

function dayToSection(agendaDay) {
  return { ...agendaDay, key: agendaDay._id, data: agendaDay.events };
}

function createSections(agendaDays, eventCategories, venues) {
  const sections = agendaDays.map(dayToSection)
  if (sections.length) {
    sections[0].first = true
  }
  for (let i = 0; i < sections.length; i += 1) {
    const s = sections[i];
    for (let j = 0; j < s.events.length; j += 1) {
      const ev = s.events[j];
      if (ev.category) {
        ev.color = eventCategories[ev.category].color;
      }
      if (ev.venue) {
        ev.venue = venues[ev.venue];
      }
    }
  }
  return sections;
}

function renderAgendaItem(agendaEvent, eventCategories, onSelect) {
  const onSelectFn = onSelect ? () => onSelect(agendaEvent) : null;
  return (
    <View>
      <AgendaItem
        agendaEvent={agendaEvent}
        color={agendaEvent.category && eventCategories[agendaEvent.category].color}
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

class AgendaList extends React.Component<void, AgendaProps, void> {
  componentWillMount() {
    this.props.loadAgenda();
  }

  render() {
    const {
      agenda, categories, venues, loadAgenda, refreshing, onItemSelect,
    } = this.props;
    const isEmpty = agenda == null || agenda.length === 0;

    return (
      <SectionList
        renderItem={({ item }) => renderAgendaItem(item, categories, onItemSelect)}
        keyExtractor={item => item._id}
        renderSectionHeader={({ section: agendaDay }) => <AgendaDayHeader agendaDay={agendaDay} />}
        ListHeaderComponent={AgendaHeader}
        ListFooterComponent={() => (isEmpty ? null : <AgendaFooter />)}
        ListEmptyComponent={() => refreshing ? null: <AgendaEmpty /> }
        sections={createSections(agenda, categories, venues)}
        onRefresh={loadAgenda}
        refreshing={refreshing}
      />
    );
  }
}

const mapStateToProps = state => ({
  agenda: state.agenda.agenda,
  categories: state.agenda.categories,
  venues: state.agenda.venues,
  refreshing: state.agenda.fetching,
});

const mapDispatchToProps = dispatch => ({
  loadAgenda: () => dispatch(fetchAgenda()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgendaList);
