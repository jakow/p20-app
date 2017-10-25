// @flow
import React from 'react';
import { Image, Text, StyleSheet, View } from 'react-native';

type LazyImageProps = {
  source: any,
  style?: any,
  width: number,
  height: number,
};

type LazyImageState = {
  loaded: boolean,
};

export default class LazyImage extends React.Component<void, LazyImageProps, LazyImageState> {
  state = {
    loaded: false
  };

  componentWillMount() {
    this.load()
  }

  async load() {
    const response = await fetch(this.props.source.uri);
    if (response.ok) {
      this.setState({ loaded: true });
    }
  }

  render() {
    const {
      source,
      style,
      width,
      height,
    } = this.props;
    return (
      this.state.loaded
        ? <Image source={source} style={ {width, height }, style} />
        : <View style={StyleSheet.absoluteFill}><Text>Loading</Text></View>
    );
  }
}
