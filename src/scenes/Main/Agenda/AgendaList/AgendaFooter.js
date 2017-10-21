import React from 'react';
import { Image, View } from 'react-native';
import style from './style';
import arrowDown from './assets/arrow-down.png';

export default function AgendaFooter() {
  return (
    <View style={style.agendaFooter}>
      <View style={style.agendaFooterLine} />
      <Image style={style.agendaFooterArrow} source={arrowDown} />
    </View>
  );
}
