import { StyleSheet } from 'react-native';
import { backgroundGray, white } from '../../../../theme/colors';

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
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowRadius: 8,
    textShadowOffset: { width: 4, height: 4 },
    padding: 20,
    margin: -20,
    backgroundColor: 'transparent',
  },
});
