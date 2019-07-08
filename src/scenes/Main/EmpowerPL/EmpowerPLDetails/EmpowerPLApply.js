import React from 'react';
import { View, Linking } from 'react-native';
import { Button, Text } from 'native-base';
import style from './style';
// <Text style={{ textAlign: 'center', marginTop: 0}}>Apply Now!</Text>
export default function EmpowerPLInfo() {
  return (
        <View>
          <Button
            light
            rounded
            style={style.appBttn}
            onPress={ ()=>{ Linking.openURL('http://empowerpl.com/')}}>
          <Text style={{width: '100%', textAlign: 'center' }}>Apply Now!</Text>
          </Button>

        </View>
  );
}
