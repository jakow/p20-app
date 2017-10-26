// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'native-base';
import { primaryColor } from '../theme/colors';

const style = StyleSheet.create({
  button: {
    backgroundColor: primaryColor,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default props => <Button {...props} style={[style.button, props.style]} />;
