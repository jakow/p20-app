// @flow
import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import LazyImage from '../../../components/LazyImage';
import HeaderBackButton from '../../../components/HeaderBackButton';
import { white, mediumGray, primaryColor } from '../../../theme/colors';
import typography from '../../../theme/typography';
import { safeAreaTop } from '../../../theme/native-base-theme/variables/commonColor';
import type { TeamMember } from '../../../services/agenda/types';

type TeamDetailProps = {
  teamMembers: { [id: string]: TeamMember },
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
  rowContainer: {
    paddingTop: 30,
    flexDirection: 'row'
  },
});

function returnValue(teamMembers, id)
{
  for(i=0; i<teamMembers.length; i++)
  {
    if(teamMembers[i]._id === id)
    {
      return teamMembers[i];
    }
  }
  return {};
}

function TeamDetail({ teamMembers, navigation }: TeamDetailProps) {
  // const teamMember = teamMembers[navigation.state.params._id];
  const teamMember = returnValue(teamMembers, navigation.state.params.id);
  const uri = teamMember.photo ? teamMember.photo.secure_url : null;
  return (
    <ScrollView style={style.scrollView}>
      <View style={style.container}>
        <LazyImage source={{ uri }} style={style.image} />
        <Text style={[typography.title1, typography.bold, style.name]}>{teamMember.name}</Text>
        {teamMember.position ?
          <Text style={[typography.title3, style.position]}>{teamMember.position}</Text>
          : null
        }
        {teamMember.occupation ?
          <Text style={[typography.title2, style.company]}>{teamMember.occupation}</Text>
          : null
        }
        {teamMember.linkedin || teamMember.email ?
          <View style={style.rowContainer}>
            {teamMember.linkedin ?
              <TouchableWithoutFeedback  onPress={()=>{ Linking.openURL(teamMember.linkedin)}}>
                <Image
                  style={{width: 50, height: 50, paddingLeft: 20}}
                  source={require('./assets/linkedin.png')}
                />
              </TouchableWithoutFeedback>
            : null
            }
            {teamMember.linkedin && teamMember.email ?
              <Text style={{width: 50, height: 50, paddingLeft: 20}}></Text>
            : null
            }
            {teamMember.email ?
              <TouchableWithoutFeedback onPress={()=>{ Linking.openURL('mailto:'+teamMember.email)}}>
                <Image
                  style={{width: 50, height: 50, paddingLeft: 20}}
                  source={require('./assets/mail.png')}
                />
                </TouchableWithoutFeedback>
                : null
              }
            </View>
          : null
        }

      </View>
    </ScrollView>
  );
}

TeamDetail.navigationOptions = ({ navigation }) => ({
  headerStyle: {
    backgroundColor: white,
    paddingTop: 0,
    height: 44,
  },
  headerTitle: 'Team',
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
  teamMembers: state.agenda.teamMembers,
});


export default connect(mapStateToProps)(TeamDetail);
