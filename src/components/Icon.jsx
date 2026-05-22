import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Icon = ({name, size = 22, color = '#333333', style}) => (
  <Ionicons name={name} size={size} color={color} style={style} />
);

export default Icon;
