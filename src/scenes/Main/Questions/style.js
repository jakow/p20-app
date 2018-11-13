import { StyleSheet } from 'react-native';
import { backgroundDark, primaryColor, white, lightGray, backgroundGray } from '../../../theme/colors';
import { statusBarSize } from '../../../theme/native-base-theme/variables/commonColor';

const listSideMargin = 14;
const blobSize = 16;
const lineWidth = 4;
const agendaItemPadding = 16;
const agendaItemMargin = 7;

export default StyleSheet.create({
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginTop: 15,
  },
  list: {
    backgroundColor: backgroundGray,
  },
  section: {
    backgroundColor: backgroundGray,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  itemSeparator: {
    width: '100%',
    backgroundColor: white,
  },
  itemSeparatorLine: {
    marginLeft: 59,
    backgroundColor: lightGray,
    height: StyleSheet.hairlineWidth,
  },
  sectionSeparator: {
    width: '100%',
    backgroundColor: lightGray,
    height: StyleSheet.hairlineWidth,
  },
  footer: {
    padding: 24,
  },
  input: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: white,
    marginTop: 10
  },
  picker: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: white,
  },
  agendaItem: {
    backgroundColor: white,
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
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  agendaItemContent:{
    width:'100%'
  }
})
