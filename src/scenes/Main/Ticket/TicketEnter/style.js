// @flow
import { StyleSheet } from 'react-native';
import { mediumGray, backgroundGray, newPink, white, newGreen } from '../../../../theme/colors';

export default StyleSheet.create({
  ticketEnterContainer: {
    flex: 1,
    backgroundColor: newPink,
  },
  ticketEnterInfoText: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  form: {
    marginBottom: 40,
  },
  or: {
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    color: white,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 20 + 15,
    right: 15,
  },
  closeButtonFill: {
    borderRadius: 6,
    padding: 12,
  },
  button: {
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: newGreen,
  },
  reticle: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    width: 240,
    height: 240,
    marginTop: -120,
    marginLeft: -120,
  },
});
