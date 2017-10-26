// @flow

import React from 'react';
import { StyleSheet, View } from 'react-native';
import SpeakerThumbnail from './SpeakerThumbnail';
import type { Speaker } from '../../../../services/agenda/types';

type SpeakerListProps = {
  speakers: Speaker[],
};

const style = StyleSheet.create({
  list: {
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
  },
});

export default function SpeakerList({ speakers }: SpeakerListProps) {
  return (
    <View>
      <View style={style.item}>
        { speakers.map(s => <SpeakerThumbnail speaker={s} />) }
      </View>
    </View>
  );
}
