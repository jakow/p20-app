// @flow
import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import fetchAgenda from '../../../services/agenda/actions';
import ViewHeader from '../../../components/ViewHeader';
import SpeakerEntry from './SpeakerEntry';
import { backgroundGray, lightGray, white } from '../../../theme/colors';
import typography from '../../../theme/typography';
import type { Speaker } from '../../../services/agenda/types';
import { statusBarSize } from '../../../theme/native-base-theme/variables/commonColor';

type SpeakerMap = {[id: string]: Speaker};

type SpeakerListProps = {
  speakers: SpeakerMap,
  refreshing: boolean,
  loadAgenda: () => void,
};


function makeSections(speakerMap: SpeakerMap) {
  // get all speakers as list
  const speakers: Speaker[] = Object.values(speakerMap);
  // sort them alphabetically
  speakers.sort((s1, s2) => s1.name.localeCompare(s2.name, ['pl', 'en']));
  // group by the first letter of their names
  const grouped = groupBy(speakers, s => s.name[0].toUpperCase());
  // convert that to sections
  const sections = [];
  Object.keys(grouped).forEach((letter) => {
    sections.push({
      title: letter.toUpperCase(),
      data: grouped[letter],
    });
  });
  // finally, sort the sections alphabetically
  sections.sort();
  return sections;
}

const style = StyleSheet.create({
  // list: {
  //   backgroundColor: backgroundGray,
  // },
  container: {
    flex: 1,
    paddingTop: statusBarSize,
    backgroundColor: backgroundGray,
  },
  section: {
    backgroundColor: backgroundGray,
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
  return <ViewHeader text="People" />
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

function SpeakerList(props: SpeakerListProps) {
  const sections = makeSections(props.speakers);
  const { navigation } = props;

  return (
    <View style={style.container}>
      <SectionList
        style={style.list}
        sections={sections}
        keyExtractor={speaker => speaker._id}
        renderItem={({ item }) => (
          <SpeakerEntry
            speaker={item}
            onPress={speakerId => navigation.navigate('SpeakerDetail', { id: speakerId })}
          />)}
        renderSectionHeader={renderSection}
        ItemSeparatorComponent={Separator}
        SectionSeparatorComponent={SectionSeparator}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        refreshing={props.refreshing}
        onRefresh={props.loadAgenda}
      />
    </View>
  );
}

SpeakerList.navigationOptions = {
  header: null,
}

function mapStateToProps(state) {
  return {
    speakers: state.agenda.speakers,
    refreshing: state.agenda.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAgenda: () => dispatch(fetchAgenda()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakerList);
