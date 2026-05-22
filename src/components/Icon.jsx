import React, {memo} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const iconFamilies = {
  ionicons: Ionicons,
  material: MaterialIcons,
};

const Icon = ({
  family = 'ionicons',
  name,
  size = 22,
  color = '#333333',
  style,
}) => {
  const IconComponent = iconFamilies[family];
  return (
    <IconComponent name={name} size={size} color={color} style={style} />
  );
};

export default memo(Icon);
