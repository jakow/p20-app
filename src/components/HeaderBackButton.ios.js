// @flow

import React from 'react';
import { Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import typography from '../theme/typography';
import backIcon from './assets/back-icon.png';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  title: {
    paddingRight: 10,
  },
  icon: {
    height: 21,
    width: 13,
    marginLeft: 9,
    marginRight: 6,
    marginVertical: 12,
    resizeMode: 'contain',
  },
});

type Props = {
  title?: string,
  titleStyle?: any,
  color?: string,
  onPress?: () => void,
}


export default function HeaderBackButton(props: Props) {
  console.log(props);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={style.container}
    >
      <Image style={[style.icon, { tintColor: props.color }]} source={backIcon} />
      <Text
        style={[typography.body, style.title, { color: props.color }, props.titleStyle]}
        numberOfLines={1}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

HeaderBackButton.defaultProps = {
  title: '',
  titleStyle: null,
  onPress: null,
  color: 'rgb(0, 122, 255)',
};
