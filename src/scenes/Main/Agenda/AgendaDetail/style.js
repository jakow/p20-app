import { StyleSheet } from 'react-native';
import { backgroundGray, mediumGray, white } from '../../../../theme/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundGray,
  },
  headerContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },
  headerText: {
    color: white,
    textShadowColor: 'argba(0, 0, 0, 0.7)',
    textShadowRadius: 8,
    textShadowOffset: { width: 4, height: 4 },
    padding: 20,
    margin: -20,
    backgroundColor: 'transparent',
  },
  footer: {
    padding: 15,
    paddingBottom: 40,
  },
  eventType: {
    color: mediumGray,
    marginBottom: 8,
  },
});
