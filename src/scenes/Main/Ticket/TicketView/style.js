import { Dimensions, Platform, StyleSheet } from 'react-native';
import { backgroundDark, mediumGray, white } from '../../../../theme/colors';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
const isIphoneX = Platform.OS === 'ios' && deviceHeight === 812 && deviceWidth === 375;
const notchSize = 24;

export default StyleSheet.create({
  background: {
    backgroundColor: backgroundDark,
    paddingTop: (isIphoneX ? 44 : 20),
    flexGrow: 1,
    alignItems: 'center',
  },
  ticket: {
    width: 296,
    backgroundColor: white,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: notchSize + 8,
    alignItems: 'center',
  },
  ticketNotch: {
    position: 'absolute',
    width: 2 * notchSize,
    height: 2 * notchSize,
    borderRadius: notchSize,
    marginLeft: -notchSize / 2,
    left: '50%',
    backgroundColor: backgroundDark,
  },
  ticketNotchTop: {
    top: -notchSize,
  },
  ticketNotchBottom: {
    bottom: -notchSize,
  },
  qrCode: {
    width: '100%',
  },
  ticketField: {
    marginTop: 8,
  },
  ticketFieldName: {
    color: mediumGray,
    textAlign: 'center',
    fontFamily: 'Source Sans Pro SemiBold',
  },
  ticketFieldValue: {
    textAlign: 'center',
  },
  ticketTable: {
    marginBottom: 8,
  },
  ticketTableRow: {
    flexDirection: 'row',
  },
  ticketRowName: {
    width: 80,
    color: mediumGray,
  },
  ticketRowValue: {
  },
  tabs: {
    marginTop: 16,
    flexShrink: 1,
    height: deviceHeight > 600 ? 500 : 420,
  },
  tab: {
    alignItems: 'center',
    flexShrink: 1,
  },
  addButtonContainer: {
    // flex: 1,
    width: 296,
    marginTop: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',

  },
});
