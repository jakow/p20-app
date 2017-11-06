// @flow
import React from 'react';
import { Image, Text, ScrollView, View } from 'react-native';
import { Button } from 'native-base';
import typography from '../../../../theme/typography';
import { primaryColor, white } from '../../../../theme/colors';
import style from './style';
import ticket from './assets/ticket.png';

type TicketStartProps = {
  onTicketAdd: () => void,
};

export default function TicketStart({ onTicketAdd }: TicketStartProps) {
  return (
    <View>
      <ScrollView style={{ height: '100%' }}>
        <View style={style.darkBg} />
        <View style={style.whiteBg} />
        <View style={style.banner}>
          <Image style={style.bannerImage} source={ticket} />
          <Text style={[typography.header, style.bannerHeadline]}>Your ticket</Text>
        </View>
        <View style={style.container}>
          <Text style={[typography.title2, style.headline]}>
            Use your ticket from the app!
          </Text>
          <Text style={[typography.body, style.body]}>
            You can can your ticket - it will stay right here until the day of the Summit.
            When you check in, you will not have to print your ticket beforehand or dig
            through emails to find it.
          </Text>
          <View style={style.buttons}>
            <Button
              primary
              style={style.button}
              onPress={onTicketAdd}
            >
              <Text style={[typography.body, { color: white, textAlign: 'center' }]}>
                I have a ticket
              </Text>
            </Button>
            <View style={style.spacer} />
            <Button
              bordered
              primary
              style={style.button}
            >
              <Text style={[typography.body, { color: primaryColor, textAlign: 'center' }]}>
                I do not have a ticket
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
