import { StyleSheet } from 'react-native';
import { textColor, mediumGray } from './colors';

export default StyleSheet.create({
  header: {
    color: textColor,
    fontFamily: 'Source Sans Pro SemiBold',
    fontSize: 34,
    lineHeight: 41,
  },
  body: {
    color: textColor,
    fontFamily: 'Source Sans Pro',
    fontSize: 17,
    lineHeight: 22,
  },
  secondary: {
    color: mediumGray,
  },
  listItem: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: 'Source Sans Pro',
    color: textColor,
  },
  bodyStrong: {
    color: textColor,
    fontFamily: 'Source Sans Pro SemiBold',
    fontSize: 17,
    lineHeight: 22,
  },
  title1: {
    color: textColor,
    fontFamily: 'Source Sans Pro',
    fontSize: 28,
    lineHeight: 34,
  },
  title2: {
    color: textColor,
    fontFamily: 'Source Sans Pro',
    fontSize: 22,
    lineHeight: 28,
  },
  title3: {
    color: textColor,
    fontFamily: 'Source Sans Pro',
    fontSize: 20,
    lineHeight: 25,
  },
  small: {
    fontFamily: 'Source Sans Pro',
    fontSize: 13,
    lineHeight: 18,
  },
  bold: {
    fontFamily: 'Source Sans Pro SemiBold',
  },
});
