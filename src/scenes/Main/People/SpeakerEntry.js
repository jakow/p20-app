// @flow
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import LazyImage from '../../../components/LazyImage';
import typography from '../../../theme/typography';
import { white, mediumGray, lightGray, newAzure, newBlue, newPink, newGreen, newViolet } from '../../../theme/colors';
import backIcon from '../../../components/assets/back-icon.png';
import type { Speaker } from '../../../services/agenda/types';

type SpeakerEntryProps = {
  speaker: Speaker,
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    height: 80,
    backgroundColor: newAzure,
  },
  back1: { backgroundColor: newAzure },
  back2: { backgroundColor: newBlue },
  back3: { backgroundColor: newGreen },
  back0: { backgroundColor: newViolet },
  textContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  thumbnail: {
    width: 80,
    height: 80,
    overflow: 'hidden',
  },
  chevron: {
    tintColor: lightGray,
    transform: [{ scale: -1 }],
    height: 14,

  },
});

function formatPosition(speaker: Speaker) {
  const { position, organisation } = speaker;
  if (!organisation) {
    return position;
  }
  return organisation;
}

export default function SpeakerThumbnail({ speaker, onPress, index }: SpeakerEntryProps) {
  const uri = speaker.photo ? speaker.photo.url : "https://res.cloudinary.com/dg1royeho/image/upload/c_fill,g_faces,h_256,w_256/s8ys6gtqhefgevgo2xrm.png"
  return (
    <TouchableHighlight
      onPress={() => onPress(speaker._id)}
      underlayColor={mediumGray}
    >
      <View style={[style.container, style['back'+(speaker.index%4)]]}>
        <LazyImage source={{ uri }} style={style.thumbnail} />
        <View style={style.textContainer}>
          <Text style={[typography.body, typography.bold]}>{speaker.displayName}</Text>
          <Text style={[typography.small, {color: white}]}>{speaker.organisation}</Text>
          <Text />
          <Text style={[typography.small, {color: white}]}>
            {speaker.occupation}
          </Text>
        </View>
        <Image
          source={backIcon}
          style={style.chevron}
          resizeMode="contain"
        />
      </View>
    </TouchableHighlight>
  );
}
