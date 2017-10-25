import { StyleSheet } from 'react-native';
import { primaryColor, backgroundGray, mediumGray, white } from '../../../../theme/colors';

const listSideMargin = 14;
const statusBarPaddingTop = 20;
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
    backgroundColor: backgroundGray,
  },

  agendaHeader: {
    paddingTop: 20,
    marginBottom: -20,
  },

  agendaDayHeader: {
    backgroundColor: backgroundGray,
    paddingLeft: listSideMargin,
    paddingRight: listSideMargin,
    paddingTop: agendaHeaderPadding + statusBarPaddingTop,
    paddingBottom: agendaHeaderPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },

  agendaHeaderBlob: {
    width: blobSize,
    height: blobSize,
    borderRadius: 4,
    backgroundColor: primaryColor,
    position: 'relative',
    left: -blobSize / 2,
  },
  agendaHeaderLine: {
    position: 'absolute',
    width: lineWidth,
    backgroundColor: primaryColor,
    top: 0,
    bottom: 0,
    left: listSideMargin - (lineWidth / 2),
  },
  agendaHeaderLineFirst: {
    position: 'absolute',
    width: lineWidth,
    backgroundColor: primaryColor,
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
    backgroundColor: white,
    padding: agendaItemPadding,
    paddingLeft: agendaItemPadding + 8,
    shadowColor: '#000000',
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    marginLeft: listSideMargin,
    marginRight: listSideMargin,
    marginTop: agendaItemMargin,
    marginBottom: agendaItemMargin,
    borderColor: 'rgba(0, 0, 0, 0.15)',
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
    tintColor: mediumGray,
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
    color: mediumGray,
  },
});
