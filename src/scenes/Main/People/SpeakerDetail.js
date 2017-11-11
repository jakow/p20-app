// @flow
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import LazyImage from '../../../components/LazyImage';
import HeaderBackButton from '../../../components/HeaderBackButton';
import { white, mediumGray, primaryColor } from '../../../theme/colors';
import typography from '../../../theme/typography';
import { safeAreaTop } from '../../../theme/native-base-theme/variables/commonColor';
import type { Speaker } from '../../../services/agenda/types';

type SpeakerDetailProps = {
  speakers: { [id: string]: Speaker },
  navigation: any,
};

const style = StyleSheet.create({
  scrollView: {
    backgroundColor: white,
    flex: 1,

  },
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    paddingTop: 24,
    paddingHorizontal: 15,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 4,
  },
  name: {
    marginTop: 32,
    textAlign: 'center',
  },
  position: {
    marginTop: 8,
    color: mediumGray,
    textAlign: 'center',
  },
  company: {
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    marginTop: 24,
    marginBottom: 32,
    textAlign: 'left',
    width: '100%',
  },
});

function SpeakerDetail({ speakers, navigation }: SpeakerDetailProps) {
  const speaker = speakers[navigation.state.params.id];
  const uri = speaker.photo ? speaker.photo.secure_url : null;
  return (
    <ScrollView style={style.scrollView}>
      <View style={style.container}>
        <LazyImage source={{ uri }} style={style.image} />
        <Text style={[typography.title1, typography.bold, style.name]}>{speaker.name}</Text>
        {speaker.position ?
          <Text style={[typography.title3, style.position]}>{speaker.position}</Text>
          : null
        }
        {speaker.company ?
          <Text style={[typography.title2, style.company]}>{speaker.company}</Text>
          : null
        }
        {speaker.description ?
          <Text style={[typography.body, style.description]}>{speaker.description.md}</Text>
          : null
        }
      </View>
    </ScrollView>
  );
}

SpeakerDetail.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: white,
    paddingTop: safeAreaTop,
    height: 44 + safeAreaTop,
  },
  headerTitle: 'Speaker details',
  headerTitleStyle: {
    fontFamily: 'Source Sans Pro SemiBold',
  },
  headerLeft: (
    <HeaderBackButton
      title="Back"
      color={primaryColor}
      onPress={() => navigation.goBack()}
    />
  ),
});

const mapStateToProps = state => ({
  speakers: state.agenda.speakers,
});


export default connect(mapStateToProps)(SpeakerDetail);
