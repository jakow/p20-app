import React from 'react';
import { View } from 'react-native';
import ViewHeader from '../../../../components/ViewHeader';
import style from './style';

export default function AgendaHeader() {
  return <View style={style.agendaHeader}><ViewHeader text="Agenda" /></View>;
}
