import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../constants/colors';
import {cardShadow} from '../utils/shadow';

const iconConfig = {
  google: {name: 'google', bg: colors.white, color: '#4285F4', size: 24},
  apple: {name: 'apple', bg: colors.white, color: colors.black, size: 26},
  facebook: {name: 'facebook', bg: colors.facebook, color: colors.white, size: 24},
};

const SocialButton = ({type}) => {
  const config = iconConfig[type];

  return (
    <TouchableOpacity
      style={[
        styles.box,
        cardShadow,
        {backgroundColor: config.bg},
        type === 'apple' && styles.appleBox,
      ]}
      activeOpacity={0.7}>
      <FontAwesome5
        name={config.name}
        brand
        size={config.size}
        color={config.color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 52,
    height: 52,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  appleBox: {
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default SocialButton;
