// @flow
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import LazyImage from '../../../../components/LazyImage';
import typography from '../../../../theme/typography';
import type { Speaker } from '../../../../services/agenda/types';

type SpeakerProps = {
  speaker: Speaker,
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
    overflow: 'hidden',
  },
});

export default function SpeakerThumbnail({ speaker }: SpeakerProps) {
  return (
    <View style={style.container}>
      <LazyImage source={{ uri: speaker.photo.secure_url }} style={style.thumbnail} />
      <Text style={typography.title3}>{speaker.name}</Text>
    </View>
  );
}
