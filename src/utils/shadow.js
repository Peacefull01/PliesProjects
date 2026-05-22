import {Platform} from 'react-native';
import {colors} from '../constants/colors';

export const cardShadow = Platform.select({
  ios: {
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  android: {
    elevation: 3,
  },
  default: {},
});
