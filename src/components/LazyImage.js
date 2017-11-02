// @flow
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import { spinnerColor } from '../theme/colors';


const defaultStyle = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

type LazyImageProps = {
  source: any,
  style?: any,
};

type LazyImageState = {
  loaded: boolean,
  opacity: Animated.Value,
};

export default class LazyImage extends React.Component<void, LazyImageProps, LazyImageState> {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = async () => {
    this.show();
  }

  show() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 400,
        timing: 'ease-in',
      },
    ).start();
  }

  render() {
    const {
      source,
      style,
    } = this.props;
    const { opacity } = this.state;
    console.log(style);
    return (
      <View style={style}>
        <View style={[StyleSheet.absoluteFill, defaultStyle.spinnerContainer]}>
          <Spinner color={spinnerColor} />
        </View>
        <Animated.Image
          source={source}
          style={[defaultStyle.image, { opacity }]}
          onLoad={this.onLoad}
        />
      </View>
    );
  }
}
