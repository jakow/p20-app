// @flow
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import LazyImage from '../../../components/LazyImage';
import typography from '../../../theme/typography';
import { white, mediumGray, lightGray } from '../../../theme/colors';
import backIcon from '../../../components/assets/back-icon.png';
import type { TeamMember } from '../../../services/agenda/types';

type TeamMemberEntryProps = {
  teamMember: TeamMember,
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 43,
    backgroundColor: white,
  },
  textContainer: {
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
  },
  thumbnail: {
    width: 29,
    height: 29,
    borderRadius: 4,
    overflow: 'hidden',
  },
  chevron: {
    tintColor: lightGray,
    transform: [{ scale: -1 }],
    height: 14,

  },
});

function formatPosition(teamMember: TeamMember) {
  const { position, company } = teamMember;
  if (!company) {
    return position;
  }
  return company;
}

export default function TeamMemberThumbnail({ teamMember, onPress }: TeamMemberEntryProps) {
  return (
    <TouchableHighlight
      onPress={() => onPress(teamMember._id)}
      underlayColor={mediumGray}
    >
      <View style={style.container}>
        <LazyImage source={{ uri: teamMember.photo.secure_url }} style={style.thumbnail} />
        <View style={style.textContainer}>
          <Text style={typography.body}>{teamMember.displayName}</Text>
          <Text style={[typography.small, typography.secondary]}>
            {formatPosition(teamMember)}
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
