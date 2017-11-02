// @flow

import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LocationButton from '../../../../components/LocationButton';
import typography from '../../../../theme/typography';
import type { Venue } from '../../../../services/agenda/types';
import locationIcon from '../assets/location.png';

type LocationProps = {
  venue: Venue
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inner: {
    flexDirection: 'row',
  },
  icon: {
    flex: 0,
    height: 24,
    width: 24,
    marginHorizontal: 12,
  },
  address: {
    marginLeft: 12,
  },
  goButton: {
    alignSelf: 'center',
    marginLeft: 24,
  },
});

function join(...strings) {
  return strings.filter(s => s != null).join(' ').trim();
}

export default function Location({ venue }: LocationProps) {
  const { location, name } = venue;
  const formattedAddress = [];

  if (name) {
    formattedAddress.push(name);
  }
  const addressLine = join(location.number, location.street1, location.street2);
  if (addressLine) {
    formattedAddress.push(addressLine);
  }
  const city = join(location.suburb, location.postcode);
  if (city) {
    formattedAddress.push(city);
  }

  return (
    <View style={style.container}>
      <Image style={style.icon} source={locationIcon} />
      <View style={style.inner}>
        <View style={style.address}>
          {formattedAddress.map(line => <Text key={line} style={typography.body}>{line}</Text>)}
        </View>
        <View style={style.goButton}>
          <LocationButton location={location} />
        </View>
      </View>
    </View>
  );
}
