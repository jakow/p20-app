// @flow
import React from 'react';
import moment from 'moment';
import { Image, Text, View } from 'react-native';
import type { AgendaEvent } from '../../../../services/agenda/types';
import style from './style';
import typography from '../../../../theme/typography';
import { primaryColor } from '../../../../theme/colors';
import chevron from './assets/chevron-right.png';

function formatEventTime(agendaTime?: {start?: Date, end?: Date}) {
  if (!agendaTime) {
    return 'TBA';
  }
  const { start, end } = agendaTime;
  const startTime = moment(start).format('HH:mm');
  const endTime = moment(end).format('HH:mm');
  if (start != null && end != null) {
    return `${startTime}—${endTime}`;
  } else if (start != null) {
    return `${startTime}—onwards`;
  } else if (end != null) {
    return `Until ${endTime}`;
  }
  return 'TBA';
}

type AgendaItemProps = {
  agendaEvent: AgendaEvent,
  color?: string,
};


export default function AgendaItem({ agendaEvent, color }: AgendaItemProps) {
  const categoryColor = {
    backgroundColor: color,
  };

  return (
    <View>
      <View style={style.agendaItem}>
        <View style={style.agendaItemContent}>
          <Text style={typography.body}>{formatEventTime(agendaEvent.time)}</Text>
          <Text style={typography.bodyStrong}>{agendaEvent.name}</Text>
        </View>
        <View>
          <Image source={chevron} style={style.agendaItemChevron} />
        </View>
        <View style={[style.agendaItemNotch, categoryColor]} />
      </View>
      <View style={[style.agendaItemLine, categoryColor]} />
    </View>
  );
}

AgendaItem.defaultProps = {
  color: primaryColor,
}
