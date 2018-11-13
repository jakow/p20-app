// @flow
import React from 'react';
import { groupBy } from 'lodash';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { View, FlatList, SectionList, TouchableHighlight, ToastAndroid, Text } from 'react-native';
import fetchQuestions from '../../../services/questions/actions';
import style from './style';
import typography from '../../../theme/typography';
import type { endQuestions } from '../../../services/questions/types';
import type { agendaDay } from '../../../services/agenda/types';
import { primaryColor, white } from '../../../theme/colors';
import {createSections} from './QuestionsAsk';
import QuestionItem from './QuestionItem';

type QuestionsMap = {[id: string]: endQuestions};

type QuestionsProps = {
  questions: QuestionsMap,
  agenda: AgendaDay[],
  refreshing: boolean,
  loadQuestions: () => void,
  onItemSelect: (QuestionId: string) => void;
};

function idToPanel(id, agendaDays){
  const resp = agendaDays.find(function(event) {
    return event.value == id
  })
  if(resp)
  {
    return resp.label;
  }
  else {
    return "Others ..."
  }
}


function createData(questionsMap: QuestionsMap, agendaDays){
  const questions: endQuestions[] = Object.values(questionsMap);

  const grouped = groupBy(questions, s => s.forEvent);
  const agendaEvents = createSections(agendaDays);

  const sections = [];
  Object.keys(grouped).forEach((letter) => {
    sections.push({
      title: idToPanel(letter, agendaEvents),
      data: grouped[letter],
    });
  });
  return sections;
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

function Footer(itemSelect) {
  const onSelectFn = itemSelect ? () => itemSelect() : null;

  return (
    <Button
      primary
      style={style.button}
      onPress={onSelectFn}>

      <Text style={[typography.body, { color: white, textAlign: 'center' }]}>
        Ask a question
      </Text>
    </Button>);
}

function SectionSeparator() {
  return <View style={style.sectionSeparator} />;
}

function renderQuestionItem(questionEvent, onSelect) {
  const onSelectFn = onSelect ? () => onSelect(questionEvent) : null;
  return (
    <View>
    <QuestionItem
      questionEvent={questionEvent}
    />
      <TouchableHighlight
        underlayColor="rgba(255, 255, 255, 0.4)"
        onPress={() => onSelect(questionEvent)}
      >
        <View />
      </TouchableHighlight>
    </View>
  );
}

class QuestionsList extends React.Component<void, QuestionsProps, void> {
  componentWillMount() {
    this.props.loadQuestions();
  }

  render() {
    const {
        questions,
        refreshing,
        agenda,
        loadQuestions,
        onItemSelect,
    } = this.props;

    const sections = createData(questions, agenda);

    return (
      <View>
      <SectionList
        style={style.list}
        sections={sections}
        keyExtractor={question => question._id}
        renderItem={({ item }) => renderQuestionItem(item, onItemSelect)}
        renderSectionHeader={renderSection}
        ItemSeparatorComponent={Separator}
        SectionSeparatorComponent={SectionSeparator}
        ListFooterComponent={Footer(onItemSelect)}
        refreshing={this.props.refreshing}
        onRefresh={this.props.loadQuestions}
      />


      </View>
    );
  }
}



const mapStateToProps = state => ({
  questions: state.questions.questions,
  refreshing: state.questions.fetching,
  agenda: state.agenda.agenda,
});

const mapDispatchToProps = dispatch => ({
  loadQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
