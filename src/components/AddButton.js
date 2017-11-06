// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import TouchableItem from './TouchableItem';
import { primaryColor } from '../theme/colors';

type AddButtonProps = {
  onPress: () => void,
};

const PLUS_SIZE = 16;
const LINE_WIDTH = 1 + StyleSheet.hairlineWidth;

const style = StyleSheet.create({
  container: {
    padding: PLUS_SIZE / 2,
    borderRadius: 8,
    borderWidth: LINE_WIDTH,
    borderColor: primaryColor,
  },
  icon: {
    width: PLUS_SIZE,
    height: PLUS_SIZE,
  },
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: primaryColor,
  },
  vertical: {
    height: PLUS_SIZE ,
    width: LINE_WIDTH,
    left: PLUS_SIZE / 2 - LINE_WIDTH / 2,
  },
  horizontal: {
    width: PLUS_SIZE,
    height: LINE_WIDTH,
    top: PLUS_SIZE / 2 - LINE_WIDTH / 2,
  },
});

export default function AddButton(props: AddButtonProps) {
  return (
    <TouchableItem
      style={style.container}
      onPress={props.onPress}
    >
      <View style={style.icon}>
        <View style={[style.bar, style.vertical]} />
        <View style={[style.bar, style.horizontal]} />
      </View>
    </TouchableItem>
  );
}
