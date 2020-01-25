import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { primaryColor, backgroundGray, mediumGray, lightGray, white, newPink, newAzure } from '../../../../theme/colors';
import { statusBarSize } from '../../../../theme/native-base-theme/variables/commonColor';

const listSideMargin = 14;
// eslint-disable-next-line
const blobSize = 16;
const lineWidth = 4;
const notchLength = 16;
const agendaHeaderPadding = 8;
const agendaHeaderHeight = 28;
const agendaItemPadding = 16;
const agendaItemMargin = 7;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: newPink,
  },

  agendaHeader: {
    paddingTop: 44,
    marginBottom: -20,
  },

  agendaDayHeader: {
    backgroundColor: newPink,
    paddingLeft: listSideMargin,
    paddingRight: listSideMargin,
    paddingTop: agendaHeaderPadding + statusBarSize,
    paddingBottom: agendaHeaderPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },

  agendaHeaderBlob: {
    width: blobSize,
    height: blobSize,
    borderRadius: 4,
    backgroundColor: white,
    position: 'relative',
    left: -blobSize / 2,
  },
  agendaHeaderLine: {
    position: 'absolute',
    width: lineWidth,
    backgroundColor: white,
    top: 0,
    bottom: 0,
    left: listSideMargin - (lineWidth / 2),
  },
  agendaHeaderLineFirst: {
    position: 'absolute',
    width: lineWidth,
    backgroundColor: white,
    height: agendaHeaderPadding + (agendaHeaderHeight / 2),
    bottom: 0,
    left: listSideMargin - (lineWidth / 2),
  },
  agendaHeaderLineUp: {
    position: 'absolute',
    width: lineWidth,
    top: '50%',
    bottom: 0,
  },

  agendaItem: {
    backgroundColor: newPink,
    padding: agendaItemPadding,
    paddingLeft: agendaItemPadding + 8,
    shadowColor: '#000000',
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    marginLeft: listSideMargin,
    marginRight: listSideMargin,
    marginTop: agendaItemMargin,
    marginBottom: agendaItemMargin,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  agendaItemLine: {
    width: lineWidth,
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: white,
    left: listSideMargin - (lineWidth / 2),
  },
  agendaItemNotch: {
    height: lineWidth,
    position: 'absolute',
    top: agendaItemPadding + 11 - (lineWidth / 2),
    left: 0,
    width: notchLength,
  },
  agendaItemContent: {
    flex: 1,
  },
  agendaItemChevron: {
    width: 16,
    height: 24,
    tintColor: lightGray,
  },
  agendaItemTouchable: {
    position: 'absolute',
    top: agendaItemPadding + agendaItemMargin,
    bottom: agendaItemPadding + agendaItemMargin,
    left: listSideMargin + lineWidth / 2,
    right: listSideMargin,
  },

  agendaFooter: {
    marginBottom: 24,
  },
  agendaFooterLine: {
    height: 24,
    width: lineWidth,
    marginLeft: listSideMargin - (lineWidth / 2),
    backgroundColor: primaryColor,
  },
  agendaFooterArrow: {
    tintColor: primaryColor,
    width: 16,
    marginLeft: listSideMargin - 8,
  },
  agendaEmpty: {
    flex: 1,
    alignItems: 'stretch',
  },
  agendaEmptyText: {
    color: white,
  },
  detailImage: {
    resizeMode: 'cover',
  },
});
