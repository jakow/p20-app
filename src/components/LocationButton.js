// @flow
import React from 'react';
import { ActionSheetIOS, Image, Linking, Platform, StyleSheet, Text } from 'react-native';
import { Button } from 'native-base';
import { geoLink, appleMapsLink, googleMapsLink } from '../services/location/utils';
import type { Location } from '../services/location/types';
import { white } from '../theme/colors';
import typography from '../theme/typography';
import defaultIcon from './assets/nav-arrow.png';

const OPEN_APPLE_MAP = 0;
const OPEN_GOOGLE_MAP = 1;
const CANCEL = 2;

function chooseFromActionSheet() {
  return new Promise((resolve) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: [
        'Open with Apple Maps',
        'Open with Google Maps',
        'Cancel',
      ],
      cancelButtonIndex: CANCEL,
    }, resolve);
  });
}

async function onOpenLocation(location: Location, os: string = Platform.OS) {
  let link;
  if (os === 'ios') {
    const choice = await chooseFromActionSheet();
    if (choice === OPEN_APPLE_MAP) {
      link = appleMapsLink(location.geo);
    } else if (choice === OPEN_GOOGLE_MAP) {
      link = googleMapsLink(location.geo);
    } else {
      return null;
    }
  } else {
    link = geoLink(location.geo);
  }
  if (await Linking.canOpenURL(link)) {
    return Linking.openURL(link);
  }
  return null;
}

type LocationButtonProps = {
  location: Location,
  style?: any,
  icon?: any;
};

const defaultStyle = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: white,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#4185F4',
  },
  icon: {
    marginRight: 6,
  },
});

export default function LocationButton({ location, style, icon }: LocationButtonProps) {
  return (
    <Button style={[defaultStyle.button, style]} onPress={() => onOpenLocation(location)}>
      <Image style={defaultStyle.icon} source={icon} />
      <Text style={[typography.body, typography.bold, defaultStyle.buttonText]}>Go</Text>
    </Button>
  );
}

LocationButton.defaultProps = {
  style: null,
  icon: defaultIcon,
};
