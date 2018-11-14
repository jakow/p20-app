// @flow
import React from 'react';
import { groupBy } from 'lodash';
import { connect } from 'react-redux';
import { Button, Picker, InputGroup, Input, Toast } from 'native-base';
import { View, FlatList, SectionList, TouchableHighlight, ToastAndroid, Text, ScrollView } from 'react-native';
import { fetchQuestions, sendQuestionToServer } from '../../../services/questions/actions';
import style from './style';
import typography from '../../../theme/typography';
import type { AgendaDay } from '../../../services/agenda/types';
import { primaryColor, white } from '../../../theme/colors';
import HeaderBackButton from '../../../components/HeaderBackButton';

type QuestionsAskProps = {
  agenda: AgendaDay[],
  refreshing: boolean,
  selectedValue: string,
};

function arrayEvents(agendaEvent)
{
  return { "label" : agendaEvent.name,
           "value" : agendaEvent._id };
}

 function dayToSection(agendaDay){
   return agendaDay.events.map(arrayEvents)
}

export function createSections(agendaDays) {
  if(agendaDays===undefined)
  {
    return [];
  }

  const sections = agendaDays.map(dayToSection)
  const merged = mergeArrays(sections)
  merged.sort((s1, s2) => s1.label.localeCompare(s2.label, ['pl', 'en']));
  merged.unshift({ "label" : "Select question panel ... ",
                      "value" : "initialValue" });
  return merged;
}

export function mergeArrays(arrays)
{
  let retArr = [];
  for(i=0; i<arrays.length; i++)
  {
    for(j=0; j<arrays[i].length; j++)
    {
      if(arrays[i][j].label != null && arrays[i][j].value != null && arrays[i][j].label != "Questions"){
        retArr.push(arrays[i][j])
      }
    }
  }
  return retArr;
}

function sendQuestion(questionDetail, navigation){
  if(questionDetail.selectedValue == "" || questionDetail.selectedValue == "initialValue")
  {
    // Toast.show({
    //             text: "Please select panel where you want to ask a question",
    //             buttonText: "Okay",
    //             type: "warning"
    //           })
    ToastAndroid.show("Please select panel where you want to ask a question", ToastAndroid.SHORT)
  }
  else if(questionDetail.signature == "" || questionDetail.selectedValue == null)
  {
    ToastAndroid.show("Please enter your signature to verify who ask question", ToastAndroid.SHORT)
  }
  else if(questionDetail.message == "" || questionDetail.selectedValue == null)
  {
    ToastAndroid.show("Please enter question body", ToastAndroid.SHORT)
  }
  else{
    askedBy = questionDetail.signature
    text = questionDetail.message
    forEvent = questionDetail.selectedValue
    if(sendQuestionToServer({"askedBy": askedBy, "text": text, "forEvent": forEvent}))
    {
      navigation.goBack();
    }
  }
}

class QuestionsAsk extends React.Component<void, QuestionsProps, void> {

  state = {
    selectedValue: "",
    signature: "",
    message: "",
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: white,
      height: 44,
    },
    headerTitle: 'Ask a Question',
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

  render() {
    const {
        agenda,
        speakres,
        selectedValue,
    } = this.props;

    data = createSections(agenda);

    let serviceItems = data.map( item => {
      return <Picker.Item key={item.value} value={item.value} label={item.label} />
    });

    return (
      <ScrollView>
        <View style={{backgroundColor: white, marginTop: 10}}>
          <Picker
            style={style.picker}
            iosHeader="Select Panel ..."
            mode="dropdown"
            selectedValue={this.state.selectedValue}
            onValueChange={(newValue) => this.setState({selectedValue: newValue})}
            >
              {serviceItems}
          </Picker>
        </View>

        <InputGroup borderType="regular" >
          <Input
            style={style.input}
            placeholder="Type your question here"
            numberOfLines={5} multiline={true}
            maxlength={150}
            onChangeText={(text) => this.setState({message: text})}
            value={this.state.message}
          />
        </InputGroup>
        <InputGroup borderType="regular" >
          <Input
            style={style.input}
            placeholder="Your Signature"
            numberOfLines={2}
            multiline={true}
            maxlength={50}
            onChangeText={(text) => this.setState({signature: text})}
            value={this.state.signature}
          />
        </InputGroup>
        <View style={{height: 10}}/>
        <View style={{height: 55, justifyContent: 'center'}}>
          <Button
            primary
            style={style.button}
            onPress={() => sendQuestion(this.state, this.props.navigation)}>
            <Text style={[typography.body, { color: white, textAlign: 'center' }]}>
              Send question
            </Text>
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  agenda: state.agenda.agenda,
});

export default connect(mapStateToProps)(QuestionsAsk);
