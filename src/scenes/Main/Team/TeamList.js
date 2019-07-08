// @flow
import React from 'react';
import { SectionList, StyleSheet, Text, View , ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import fetchAgenda from '../../../services/agenda/actions';
import ViewHeader from '../../../components/ViewHeader';
import TeamMemberEntry from './TeamEntry';
import { backgroundGray, lightGray, white, newPink } from '../../../theme/colors';
import typography from '../../../theme/typography';
import type { TeamMember } from '../../../services/agenda/types';
import { statusBarSize } from '../../../theme/native-base-theme/variables/commonColor';

type TeamMemberMap = {[id: string]: TeamMember};

type TeamMemberListProps = {
  teamMembers: TeamMemberMap,
  refreshing: boolean,
  loadAgenda: () => void,
};

function changeName(speaker, index){
  var arr = speaker.name.split(" ");
  temp = arr.pop();
  arr.unshift(temp);
  speaker.name = arr.join(" ");
  return speaker;
}

function makeSections(teamMemberMap: TeamMemberMap) {
  // get all teamMembers as list
  const teamMembers: TeamMember[] = Object.values(teamMemberMap);

  teamMembers.map(changeName)

  // sort them alphabetically
  teamMembers.sort((s1, s2) => s1.name.localeCompare(s2.name, ['pl', 'en']));
  // group by the first letter of their names
  const grouped = groupBy(teamMembers, s => s.name[0].toUpperCase());

  // convert that to sections
  const sections = [];
  Object.keys(grouped).forEach((letter) => {
    sections.push({
      title: letter.toUpperCase(),
      data: grouped[letter],
    });
  });
  // finally, sort the sections alphabetically
  sections.sort((s1, s2) => s1.title.localeCompare(s2.title, ['pl', 'en']));
  return sections;
}

const style = StyleSheet.create({
  // list: {
  //   backgroundColor: backgroundGray,
  // },
  container: {
    flex: 1,
    paddingTop: statusBarSize,
    backgroundColor: newPink,
  },
  section: {
    backgroundColor: newPink,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  itemSeparator: {
    width: '100%',
    backgroundColor: white,
  },
  itemSeparatorLine: {
    marginLeft: 59,
    backgroundColor: lightGray,
    height: StyleSheet.hairlineWidth,
  },
  sectionSeparator: {
    width: '100%',
    backgroundColor: lightGray,
    height: StyleSheet.hairlineWidth,
  },
  footer: {
    padding: 24,
  },
});

function Header() {
  return <ViewHeader text="Team" />
}

function renderSection({ section }) {
  return (
    <View key={section.title} style={style.section}>
      <Text style={[typography.title3, typography.bold]}>{section.title}</Text>
    </View>
  );
}

function Separator() {
  return (
    <View style={style.itemSeparator}>
      <View style={style.itemSeparatorLine} />
    </View>
  );
}

function SectionSeparator() {
  return <View style={style.sectionSeparator} />;
}

function Footer() {
  return <View style={style.footer} />;
}

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

function TeamMemberList(props: TeamMemberListProps) {
  const sections = props.teamMembers ? makeSections(props.teamMembers) : null;
  let singleMember = {};
  const teamMembers = props.teamMembers;
  const { navigation } = props;
  let i = 0;

  return (
    <View style={style.container}>
      {props.teamMembers ? <SectionList
        style={style.list}
        sections={sections}
        keyExtractor={teamMember => teamMember._id}
        renderItem={({ item }) => (
          <TeamMemberEntry
            index={teamMembers.sort((s1, s2) => s1.name.localeCompare(s2.name, ['pl', 'en'])).indexOf(item)}
            teamMember={item}
            onPress={(teamMemberId) => {
              singleMember = returnValue(teamMembers, teamMemberId);
                navigation.navigate('TeamDetail', { id: teamMemberId })
              }
            }
          />)}
        renderSectionHeader={renderSection}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        refreshing={props.refreshing}
        onRefresh={props.loadAgenda}
      /> : null}
    </View>
  );
}

TeamMemberList.navigationOptions = {
  header: null,
}

function mapStateToProps(state) {
  return {
    teamMembers: state.agenda.data.teamMembers,
    refreshing: state.agenda.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAgenda: () => dispatch(fetchAgenda()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberList);
