import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import AnimatedLogo from '../../components/AnimatedLogo';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  }
})

export default class Welcome extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <AnimatedLogo height={100} />
      </View>);
  }
}
