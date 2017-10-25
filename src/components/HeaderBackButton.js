/* @flow */

import React from 'react';
import {
  I18nManager,
  Image,
  Text,
  View,
  Platform,
  StyleSheet,
} from 'react-native';

import TouchableItem from './TouchableItem';

type Props = {
  onPress?: () => void,
  pressColorAndroid?: string,
  title?: ?string,
  titleStyle?: ?any,
  tintColor?: ?string,
  truncatedTitle?: ?string,
  width?: ?number,
};

type DefaultProps = {
  pressColorAndroid: string,
  tintColor: ?string,
  truncatedTitle: ?string,
};

type State = {
  initialTextWidth?: number,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
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
        marginLeft: 10,
        marginRight: 22,
        marginVertical: 12,
        resizeMode: 'contain',
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
      }
      : {
        height: 24,
        width: 24,
        margin: 16,
        resizeMode: 'contain',
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
      },
  iconWithTitle:
    Platform.OS === 'ios'
      ? {
        marginRight: 5,
      }
      : {},
});

class HeaderBackButton extends React.PureComponent<DefaultProps, Props, State> {
  static defaultProps = {
    pressColorAndroid: 'rgba(0, 0, 0, .32)',
    tintColor: Platform.select({
      ios: '#037aff',
    }),
    truncatedTitle: 'Back',
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
      width,
      title,
      titleStyle,
      tintColor,
      truncatedTitle,
    } = this.props;

    const renderTruncated =
      this.state.initialTextWidth && width
        ? this.state.initialTextWidth > width
        : false;

    const backButtonTitle = renderTruncated ? truncatedTitle : title;

    // eslint-disable-next-line global-require
    const asset = require('../assets/back-icon.png');

    return (
      <TouchableItem
        accessibilityComponentType="button"
        accessibilityLabel={backButtonTitle}
        accessibilityTraits="button"
        testID="header-back"
        delayPressIn={0}
        onPress={onPress}
        pressColor={pressColorAndroid}
        style={styles.container}
        borderless
      >
        <View style={styles.container}>
          <Image
            style={[
              styles.icon,
              !!title && styles.iconWithTitle,
              !!tintColor && { tintColor },
            ]}
            source={asset}
          />
          {Platform.OS === 'ios' &&
            title && (
              <Text
                onLayout={this._onTextLayout}
                style={[
                  styles.title,
                  !!tintColor && { color: tintColor },
                  titleStyle,
                ]}
                numberOfLines={1}
              >
                {backButtonTitle}
              </Text>
            )}
        </View>
      </TouchableItem>
    );
  }
}



export default HeaderBackButton;
