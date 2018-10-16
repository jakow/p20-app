import React from 'react';
import { View, Linking } from 'react-native';
import { Button, Text } from 'native-base';
import style from './style';

export default function EmpowerPLInfo() {
  return (
        <View>
          <Button
            light
            rounded
            style={style.appBttn}
            onPress={ ()=>{ Linking.openURL('http://empowerpl.com/')}}>
              <Text style={{ textAlign: 'center', marginTop: 6}}>{"\n"}Apply Now!</Text>
          </Button>

        </View>
  );
}