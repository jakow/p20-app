// @flow
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import type { Speaker } from '../../../../services/agenda/types';

type SpeakerProps = {
  speaker: Speaker,
}

const style = StyleSheet.create({
  thumbnail: {
    width: 32,
    height: 32,
  },
});

export default function SpeakerThumbnail({ speaker }: SpeakerProps) {
  return (
    <View>
      <Image source={{ uri: speaker.photo.secure_url }} style={style.thumbnail} />
    </View>
  );
}
