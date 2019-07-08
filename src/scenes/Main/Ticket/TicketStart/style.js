import { StyleSheet } from 'react-native';
import { backgroundDark, primaryColor, white, newPink, newGreen } from '../../../../theme/colors';
import { statusBarSize } from '../../../../theme/native-base-theme/variables/commonColor';
const imageMargin = 20;

export default StyleSheet.create({
  darkBg: {
    position: 'absolute',
    top: '-100%',
    height: '100%',
    left: 0,
    right: 0,
    backgroundColor: backgroundDark,
  },
  whiteBg: {
    position: 'absolute',
    top: '100%',
    height: '100%',
    left: 0,
    right: 0,
    backgroundColor: newPink,
  },

  banner: {
    paddingTop: statusBarSize + 20,
    paddingBottom: 20,
    backgroundColor: backgroundDark,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerHeadline: {
    textAlign: 'center',
    color: white,
    backgroundColor: '#00000000',
  },
  bannerImage: {
    marginBottom: imageMargin,
  },
  container: {
    backgroundColor: newPink,
    padding: 15,
  },
  body: {
    marginBottom: 24,
  },
  headline: {
    color: primaryColor,
    marginBottom: 12,
  },
  buttonsInline: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: newGreen
  },
  spacer: {
    width: 15,
    flex: 0,
  },
});
