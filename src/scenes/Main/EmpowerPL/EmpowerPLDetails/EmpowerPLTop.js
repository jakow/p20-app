import React from 'react';
import { View, Text, Image} from 'react-native';
import EmpowerPLVideo from './EmpowerPLVideo';
import style from './style';


export default function EmpowerPLTop() {
  return (
    <View style={style.bcgTop}>
          <Image style={{width: '100%', height: '100%', position: 'absolute'}} source={require('../assets/header.jpg')} />
          <Text style={style.mentor}>Mentoring Programme</Text>
          <Text style={style.empo}>empowerPL</Text>
          <View style={style.separator} />
          <Text style={style.last}>Poland 2.0 <Text style={{fontWeight: 'bold'}}>X</Text> BCG{"\n"}{"\n"}{"\n"}</Text>
    </View>
  )};
