// @flow
import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Location from '../components/Location';
import SpeakerList from '../components/SpeakerList';
import LazyImage from '../../../../components/LazyImage';

import type { AgendaEvent, Speaker } from '../../../../services/agenda/types';
import { formatEventTime } from '../../../../services/agenda/utils';
import typography from '../../../../theme/typography';
import style from './style';
import defaultEventImage from '../assets/defaultEventImage.jpg';

type AgendaDetailProps = {
  events: {[id: string]: AgendaEvent},
  speakers: {[id: string]: Speaker},
  eventId: string,
  // toggleFavourite: (id: string) => void,
}

const RATIO = 1.6;

function AgendaDetail({ eventId, events, speakers }: AgendaDetailProps) {
  const ev = events[eventId];
  const speakerList = ev.speakers.map(id => speakers[id]);
  const height = Dimensions.get('window').width / RATIO;
  const image = ev.image ? { uri: ev.image.secure_url } : defaultEventImage;

  return (
    <View style={style.container}>
      <ScrollView>
        <View style={style.header}>
          <LazyImage
            source={image}
            style={{ ...style.detailImage, width: '100%', height }}
          />
          <View style={style.headerContainer}>
            <Text style={[typography.header, style.headerText]}>{ev.name}</Text>
            <Text style={[typography.title2, style.headerText]}>{formatEventTime(ev.time)}</Text>
          </View>
        </View>
        <View style={style.footer}>
          { ev.venue != null && <Location venue={ev.venue} /> }
          { speakerList.length > 0 && <SpeakerList speakers={speakerList} /> }
          { ev.type ?
            <Text style={[typography.bodyStrong, style.eventType]}>
              {ev.type.toUpperCase()}
            </Text> : null
          }
          <Text style={[typography.body, style.eventDescription]}>
            {ev.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}


const mapStateToProps = state => ({
  events: state.agenda.events,
  speakers: state.agenda.speakers,
});

export default connect(mapStateToProps)(AgendaDetail);
