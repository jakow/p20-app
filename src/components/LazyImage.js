// @flow
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Spinner from './Spinner';
import { spinnerColor } from '../theme/colors';


const defaultStyle = StyleSheet.create({
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  showSpinner: boolean,
};

export default class LazyImage extends React.Component<void, LazyImageProps, LazyImageState> {
  state = {
    opacity: new Animated.Value(0),
    showSpinner: true,
  };

  onLoad = async () => {
    this.show();
  }

  show() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        duration: 300,
        timing: 'ease-in',
      },
    ).start(() => this.setState({ showSpinner: false }))
  }

  render() {
    const {
      source,
      style,
    } = this.props;
    const { opacity } = this.state;
    return (
      <View style={style}>
        <View style={[StyleSheet.absoluteFill, defaultStyle.spinnerContainer]}>
          {this.state.showSpinner && <Spinner color={spinnerColor} />}
        </View>
        <Animated.Image
          source={source}
          style={[defaultStyle.image, style, { opacity }]}
          onLoad={this.onLoad}
        />
      </View>
    );
  }
}
