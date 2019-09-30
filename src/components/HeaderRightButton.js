// @flow
import React from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import TouchableItem from './TouchableItem';
import { primaryColor, lightGray, white } from '../theme/colors';
import backIcon from './assets/back-icon.png';

type HeaderRightButtonProps = {
  title?: string,
  onPress?: () => void,
  color?: string,
  showIcon?: boolean,
  disabled?: boolean,
  disabledColor?: string,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingRight: 16,
  },
  title: {
    fontSize: 17,
    paddingLeft: 10,
  },
  icon:
    Platform.select({
      ios: {
        height: 21,
        width: 13,
        marginLeft: 5,
        marginVertical: 12,
        resizeMode: 'contain',
        transform: [{ rotate: '180deg' }],
      },
      android: {
        height: 24,
        width: 24,
        margin: 16,
        resizeMode: 'contain',
      },
    }),
  iconWithTitle: Platform.OS === 'ios' ? { marginRight: 5 } : {},
});

export default function HeaderRightButton({
  title,
  disabled,
  disabledColor,
  color: activeColor,
  onPress,
  showIcon,
}: HeaderRightButtonProps) {
  const color = disabled ? disabledColor : activeColor;
  return (
    <TouchableItem
      accessibilityComponentType="button"
      accessibilityLabel={title}
      accessibilityTraits="button"
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : undefined}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color }]}>{title}</Text>
        { showIcon && <Image
          source={backIcon}
          style={[
            styles.icon,
            !!title && styles.iconWithTitle,
            { tintColor: color },
          ]}
        />
        }
      </View>
    </TouchableItem>
  );
}

HeaderRightButton.defaultProps = {
  title: 'Next',
  color: white,
  disabled: false,
  disabledColor: lightGray,
  onPress: null,
  showIcon: false,
};
