// @flow
import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import LazyImage from '../../../components/LazyImage';
import typography from '../../../theme/typography';
import { white, mediumGray, lightGray, newBlue, newAzure, newGreen, newViolet } from '../../../theme/colors';
import backIcon from '../../../components/assets/back-icon.png';
import type { TeamMember } from '../../../services/agenda/types';


type TeamMemberEntryProps = {
  teamMember: TeamMember,
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    height: 80,
    backgroundColor: white,
  },
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
  back1:{
    backgroundColor: newBlue
  },
  back2:{
    backgroundColor: newAzure
  },
  back3:{
    backgroundColor: newGreen
  },
  back4:{
    backgroundColor: newViolet
  },
});

function formatPosition(teamMember: TeamMember) {
  const { position, company } = teamMember;
  if (!company) {
    return position;
  }
  return company;
}

function getBackground(index){
  switch(index%4){
    case 0:
      return style.back1;
    case 1:
      return style.back2;
    case 2:
      return style.back3;
    case 3:
      return style.back4;
        
  }
}

export default function TeamMemberThumbnail({ index, teamMember, onPress }: TeamMemberEntryProps) {
  return (
    <TouchableHighlight
      onPress={() => onPress(teamMember._id)}
      underlayColor={mediumGray}
    >
      <View style={[style.container, getBackground(index)]}>
        <LazyImage source={{ uri: teamMember.photo.url }} style={style.thumbnail} />
        <View style={style.textContainer}>
          <Text style={[typography.body, typography.bold]}>{teamMember.name}</Text>
          <Text style={[typography.small, {color: white}]}>{teamMember.organisation}</Text>
          <Text />
          <Text style={[typography.small, {color: white}]}>
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
