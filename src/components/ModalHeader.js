// @flow
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { white, mediumGray, newGreen } from '../theme/colors';
import typography from '../theme/typography';

const style = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: newGreen,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: mediumGray,
  },
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centerText: {
    width: '100%',
    textAlign: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

type ModalHeaderProps = {
  leftButtonText: string,
  onLeftButtonPress: () => void,
  title: string,
}

// eslint-disable-next-line
export default function ModalHeader({ leftButtonText, onLeftButtonPress, title }: ModalHeaderProps) {
  return (
    <View style={style.header}>
      <View style={style.container}>
        <Text style={[typography.body, typography.bold]}>{title}</Text>
        {leftButtonText &&
        <TouchableOpacity
          style={style.leftButton}
          onPress={onLeftButtonPress}>
          <Text style={[typography.body]}>{leftButtonText}</Text>
        </TouchableOpacity>
        }
      </View>
    </View>
  );
}
