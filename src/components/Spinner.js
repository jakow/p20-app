// @flow
import React from 'react';
import { Animated, StyleSheet } from 'react-native';

type DefaultSpinnerProps = {
  style: any,
};
type SpinnerProps = {
  style? :any,
};


type SpinnerState = {
  animation: Animated.Value,
};

const style = StyleSheet.create({
  spinner: {
    width: 32,
    height: 32,
  },
});


export default class Spinner extends React.Component<
  DefaultSpinnerProps, SpinnerProps, SpinnerState> {
  static defaultProps = {
    style: style.spinner
  }

  state = {
    animation: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.loop(Animated.timing(this.state.animation, {
      duration: 600,
      toValue: 1,
    }), {
      iterations: Infinity,
    }).start();
  }

  render() {
    const spin = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
    return (
      <Animated.Image
        style={[
          this.props.style,
          { transform: [{ rotate: spin }] }]}
        source={require('./assets/spinner.png')}
      />
    );
  }
}
