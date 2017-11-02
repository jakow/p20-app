// @flow
import { Linking, Platform } from 'react-native';
import type { Location, LngLat } from './types';

export function appleMapsLink(geo: LngLat, os: string = Platform.OS) {
  const [lng, lat] = geo;
  if (os !== 'ios') {
    throw new Error('Supported only for iOS');
  }
  return `http://maps.apple.com/?daddr=${lat},${lng}`;
}

export function googleMapsLink(geo: LngLat) {
  const [lng, lat] = geo;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function geoLink(geo: LngLat) {
  const [lng, lat] = geo;
  return `geo:${lat},${lng}`;
}

export default async function tryOpenMapAtLocation(location: Location): Promise<boolean> {
  if (!location.geo) {
    return false;
  }
  const link = geoLink(location.geo)
  if (!(await Linking.canOpenURL(link))) {
    return false;
  }
  Linking.openURL(link);
  return true;
}
