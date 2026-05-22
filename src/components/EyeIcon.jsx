import React, {memo} from 'react';
import {colors} from '../constants/colors';
import Icon from './Icon';

const EyeIcon = ({visible}) => (
  <Icon
    family="ionicons"
    name={visible ? 'eye-outline' : 'eye-off-outline'}
    size={20}
    color={colors.textGray}
  />
);

export default memo(EyeIcon);
