/* @flow */

import React from 'react';
import {
  Image,
  View,
  Platform,
  StyleSheet,
} from 'react-native';
import { Text } from 'native-base';
import TouchableItem from './TouchableItem';
import backIcon from './assets/back-icon.png';
import { primaryColor } from '../theme/colors';

type Props = {
  onPress?: () => void,
  pressColorAndroid?: string,
  title?: ?string,
  titleStyle?: ?any,
  color?: ?string,
  disabled?: boolean,
};

type DefaultProps = {
  pressColorAndroid: string,
  color: string,
  disabled: boolean,
};

type State = {
  initialTextWidth?: number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingLeft: Platform.OS === 'ios' ? 8 : 16,
  },
  title: {
    fontSize: 17,
    paddingRight: 10,
  },
  icon:
    Platform.OS === 'ios'
      ? {
        height: 21,
        width: 13,
        marginRight: 5,
        marginVertical: 12,
        resizeMode: 'contain',
      }
      : {
        height: 24,
        width: 24,
        margin: 16,
        resizeMode: 'contain',
      },
  iconWithTitle: Platform.OS === 'ios' ? { marginRight: 5 } : {},
});

class HeaderBackButton extends React.PureComponent<DefaultProps, Props, State> {
  static defaultProps = {
    pressColorAndroid: 'rgba(0, 0, 0, .32)',
    color: primaryColor,
    disabled: false,
  };

  state = {};

  _onTextLayout = (e: any) => {
    if (this.state.initialTextWidth) {
      return;
    }
    this.setState({
      initialTextWidth: e.nativeEvent.layout.x + e.nativeEvent.layout.width,
    });
  };

  render() {
    const {
      onPress,
      pressColorAndroid,
      title,
      titleStyle,
      color,
    } = this.props;

    return (
      <TouchableItem
        accessibilityComponentType="button"
        accessibilityLabel={title}
        accessibilityTraits="button"
        testID="header-back"
        delayPressIn={0}
        onPress={onPress}
        pressColor={pressColorAndroid}
        borderless

      >
        <View style={styles.container}>
          <Image
            style={[
              styles.icon,
              !!title && styles.iconWithTitle,
              !!color && { tintColor: color },
            ]}
            source={backIcon}
          />
          {Platform.OS === 'ios' &&
            title && (
              <Text
                onLayout={this._onTextLayout}
                style={[
                  styles.title,
                  !!color && { color },
                  titleStyle,
                ]}
                numberOfLines={1}
              >
                {title}
              </Text>
            )}
        </View>
      </TouchableItem>
    );
  }
}

export default HeaderBackButton;
