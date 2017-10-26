// @flow

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import type { Venue } from '../../../../services/agenda/types';
import locationIcon from '../assets/location.png';

type LocationProps = {
  venue: Venue
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    flex: 0,
  },
  address: {

  },
  goButton: {
    flex: 0,
  }
})

export default function Location({ venue }: LocationProps) {
  const { location, name } = venue;
  const formattedAddress = [];

  if (name) {
    formattedAddress.push(name);
  }
  const addressLine = [location.number, location.street1, location.street1].join(' ').trim()
  if (addressLine) {
    formattedAddress.push(addressLine);
  }
  const city = `${location.suburb} ${location.postcode}`.trim()
  if (city) {
    formattedAddress.push(city)
  }

  return (
    <View style={style.container}>
      <Image source={locationIcon} />
      <View style={style.address}>
        {formattedAddress.map(line => <Text>{line}</Text>)}
      </View>
    </View>
  );
}
