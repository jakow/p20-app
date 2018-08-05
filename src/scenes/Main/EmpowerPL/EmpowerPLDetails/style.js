import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';
import { primaryColor, backgroundGray, mediumGray, lightGray, white } from '../../../../theme/colors';
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
  },

  bcgTop: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  empo: {
        fontSize: 60,
        width: 500,
        textAlign: 'center',
        color: '#ffffff',
  },
  mentor: {
        fontWeight: 'bold',
        marginTop: 250,
        fontSize: 25,
        width: 500,
        textAlign: 'center',
        color: '#ffffff',
  },
  objectives: {
    fontWeight: 'bold',
    fontSize: 25,
    width: 500,
    color: '#ffffff',
    textAlign: 'center',
  },
  desc: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
  separator: {
    backgroundColor: '#dfe344',
    width: 100,
    height: 5,
    margin: 15,
  },
  last: {
    marginTop: 10,
    marginBottom: 150,
    fontSize: 25,
    color: '#ffffff',
    width: 500,
    textAlign: 'center'
  },
  appBttn: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    marginBottom: 30,
  },


});
