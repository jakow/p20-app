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
    marginBottom: 20,
  },
  item: {
    marginBottom: 20,
  },
  lastItem: {
    marginBottom: 0,
  },
});

export default function SpeakerList({ speakers }: SpeakerListProps) {
  return (
    <View style={style.list}>
      { speakers.map((s, idx) => (
        <View
          key={s._id}
          style={[style.item, (idx === speakers.length - 1) && style.lastItem]}
        >
          <SpeakerThumbnail speaker={s} />
        </View>
        ))
      }
    </View>
  );
}
