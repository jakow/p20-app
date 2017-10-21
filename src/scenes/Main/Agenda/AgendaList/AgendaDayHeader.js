// @flow
import React from 'react';
import { Text, View } from 'react-native';
import style from './style';
import typography from '../../../../theme/typography';

type AgendaHeaderProps = {
  agendaDay: any,
};

export default function AgendaHeader({ agendaDay }: AgendaHeaderProps) {
  return (
    <View style={style.agendaDayHeader}>
      <View style={agendaDay.first ? style.agendaHeaderLineFirst : style.agendaHeaderLine} />
      <View style={style.agendaHeaderBlob} />
      <Text style={typography.title2}>{agendaDay.name}</Text>
    </View>
  );
}
