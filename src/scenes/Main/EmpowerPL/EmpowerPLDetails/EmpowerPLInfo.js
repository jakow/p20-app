import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import EmpowerPLVideo from './EmpowerPLVideo';
import EmpowerPLTop from './EmpowerPLTop';
import EmpowerPLApply from './EmpowerPLApply';
import style from './style';
import colors from '../../../../theme/colors';

export default function EmpowerPLInfo() {
  return (
    <ScrollView contentContainerStyle={{justifyContent: 'center'}}>
      <EmpowerPLTop />
      <View style={{alignItems: 'center', backgroundColor: '#E2445C'}}>
        <Text style={style.objectives}>{"\n"}Objectives</Text>
        <View style={style.separator} />
        <Text style={style.desc}>This year, we will launch the second edition of the empowerPL programme, which was started in cooperation with the Boston Consulting Group during last year’s Poland 2.0 Summit.{"\n"}{"\n"}

              The programme aims to build relationships between the best Polish managers and directors, and Polish students from the best universities in the UK and France.{"\n"}{"\n"}

              While empowerPL is already the most significant mentoring program in Poland, we aim to expand this initiative further to celebrate Poland’s 100 years of independence with 100 inspiring mentors.
              {"\n"}{"\n"}
        </Text>


        <EmpowerPLVideo />
        <Text>{"\n\n"}</Text>
        <EmpowerPLApply />
      </View>
    </ScrollView>

  );
}
