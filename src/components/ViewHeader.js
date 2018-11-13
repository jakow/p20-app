// @flow
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import typography from '../theme/typography';

type SectionHeaderProps = {
  text: string,
  children: any,
}

const style = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 40 : 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textColumn: {
    flex: 1,
  },
  controlsColumn: {
    flex: 0,
  },
});

export default function ViewHeader(props: SectionHeaderProps) {
  return (
    <View style={style.container}>
      <View style={style.textColumn}>
        <Text style={typography.header}>{props.text}</Text>
      </View>
      <View style={style.controlsColumn}>
        { props.children }
      </View>
    </View>
  );
}
