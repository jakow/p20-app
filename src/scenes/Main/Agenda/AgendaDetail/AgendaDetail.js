// @flow
import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Location from '../components/Location';
import SpeakerList from '../components/SpeakerList';
import LazyImage from '../../../../components/LazyImage';

import type { AgendaEvent, Venue, Speaker } from '../../../../services/agenda/types';
import { formatEventTime } from '../../../../services/agenda/utils';
import typography from '../../../../theme/typography';
import style from './style';

type AgendaDetailProps = {
  events: {[id: string]: AgendaEvent},
  venues: {[id: string]: Venue},
  speakers: {[id: string]: Speaker},
  eventId: string,
}

const RATIO = 1.6;

function AgendaDetail({ eventId, events, venues, speakers }: AgendaDetailProps) {
  const ev = events[eventId];
  const venue = venues[ev.venue];
  const speakerList = ev.speakers.map(id => speakers[id]);

  const { width } = Dimensions.get('window');
  const height = width / RATIO;
  return (
    <ScrollView style={style.container}>
      <View>
        <LazyImage
          source={{ uri: 'http://lorempixel.com/1280/800', headers: { pragma: 'no-cache' } }}
          placeholder={{ uri: 'https://placehold.it/32x20' }}
          width={width}
          height={height}
        />
        <View style={style.headerContainer}>
          <Text style={[typography.header, style.headerText]}>{ev.name}</Text>
          <Text style={[typography.title2, style.headerText]}>{formatEventTime(ev.time)}</Text>
        </View>
      </View>
      <Location venue={venue} />
      <SpeakerList speakers={speakerList} />
    </ScrollView>
  );
}


const mapStateToProps = state => ({
  events: state.agenda.events,
  venues: state.agenda.venues,
  speakers: state.agenda.speakers,
});

export default connect(mapStateToProps)(AgendaDetail);
