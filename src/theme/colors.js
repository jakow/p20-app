import { Platform } from 'react-native';

export const primaryColor = '#E2445C';
export const textColor = '#323232';
export const mediumGray = '#888888';
export const backgroundGray = '#F6F6F6';
export const backgroundDark = '#3A3F4A';
export const white = '#FFFFFF';
export const spinnerColor = Platform.OS === 'ios' ? mediumGray : primaryColor;
