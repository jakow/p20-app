// @flow
import React from 'react';
import { Animated, StyleSheet, View, Platform } from 'react-native';
import { Spinner } from 'native-base';
import { spinnerColor } from '../theme/colors';


const style = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.1)',
  },
});

type LazyImageProps = {
  source: any,
  style?: any,
  width: number,
  height: number,
};

type LazyImageState = {
  loaded: boolean,
  opacity: Animated.Value,
};

export default class LazyImage extends React.Component<void, LazyImageProps, LazyImageState> {
  state = {
    loaded: false,
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
      style: imageStyle,
      width,
      height,
    } = this.props;
    const { opacity } = this.state;
    console.log(this.state);
    return (
      <View>
        <View style={[StyleSheet.absoluteFill, style.spinnerContainer]}>
          <Spinner color={spinnerColor} />
        </View>
        <Animated.Image
          source={source}
          style={[imageStyle, { width, height, opacity }]}
          onLoad={this.onLoad}
        />
      </View>
    );
  }
}
