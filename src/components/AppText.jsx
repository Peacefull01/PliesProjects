import React from 'react';
import {Text} from 'react-native';
import {getFontFamily} from '../constants/fonts';

const AppText = ({weight = 'regular', style, ...rest}) => (
  <Text style={[{fontFamily: getFontFamily(weight)}, style]} {...rest} />
);

export default AppText;
