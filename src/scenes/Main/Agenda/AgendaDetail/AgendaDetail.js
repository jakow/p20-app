// @flow
import React from 'react';
import { ScrollView, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import LazyImage from '../../../../components/LazyImage';
import type { AgendaEvent } from '../../../../services/agenda/types';

type AgendaDetailProps = {
  events: {[id: string]: AgendaEvent},
  eventId: string,
}

const RATIO = 1.6


function AgendaDetail({ eventId, events }: AgendaDetailProps) {
  const ev = events[eventId];
  const { width } = Dimensions.get('window');
  const height = width / RATIO;
  return (
    <ScrollView>
      <LazyImage
        source={{ uri: 'https://placehold.it/320x200' }}
        placeholder={{ uri: 'https://placehold.it/32x20' }}
        width={width}
        height={height}
      />
      <Text>{ev.name}</Text>
    </ScrollView>
  );
}


const mapStateToProps = state => ({
  events: state.agenda.events,
});

export default connect(mapStateToProps)(AgendaDetail);
