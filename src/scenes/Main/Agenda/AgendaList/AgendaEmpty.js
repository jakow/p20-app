// @flow
import React from 'react';
import { View, Text } from 'react-native';
import style from './style';
import typography from '../../../../theme/typography';

export default function AgendaEmpty() {
  return (
    <View style={style.agendaEmpty}>
      <Text style={[typography.body, style.agendaEmptyText]}>
        Agenda is not available right now. Please check your connection.
      </Text>
    </View>
  );
}
