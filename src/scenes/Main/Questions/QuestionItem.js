// @flow
import React from 'react';
import { Image, Text, View } from 'react-native';
import type { QuestionEvent } from '../../../services/questions/types';
import { formatEventTime } from '../../../services/agenda/utils';
import style from './style';
import typography from '../../../theme/typography';
import { primaryColor } from '../../../theme/colors';
// import chevron from '../assets/chevron-right.png';



type QuestionProps = {
  question: QuestionEvent,
  color?: string,
};


export default function QuestionItem({ questionEvent }: QuestionProps) {
  const categoryColor = {
    backgroundColor: "#000000",
  };

  return (
    <View>
      <View style={style.agendaItem}>
        <View style={style.agendaItemContent}>
          <Text style={typography.body}>{questionEvent.text}</Text>
          <View style={{alignItems: 'flex-end', width: '100%'}}>
            <Text style={typography.bodyStrong}>Asked by ~{questionEvent.askedBy}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

QuestionItem.defaultProps = {
  color: primaryColor,
}
