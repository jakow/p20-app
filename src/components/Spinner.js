// @flow
import React from 'react';
import { Animated, StyleSheet } from 'react-native';

type SpinnerProps = {
  style? :any,
};


type SpinnerState = {
  animation: Animated.Value,
};


class Spinner extends React.Component<void, SpinnerProps, SpinnerState> {
  state = {
    animation: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.loop(Animated.timing(this.state.animation, {
      duration: 400,
      toValue: 360,
    }), {
      iterations: Infinity,
    });
  }

  render() {
    return (
      <Animated.Image
        style={[
          this.props.style,
          { transform: [{ rotate: this.state.animation }] }]}
        source={require('./assets/spinner.png')}
      />
    );
  }
}
