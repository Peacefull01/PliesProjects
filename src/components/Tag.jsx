import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import {colors} from '../constants/colors';

const Tag = ({label}) => (
  <View style={styles.tag}>
    <AppText style={styles.text} weight="medium">
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  tag: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 0,
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    color: colors.tagText,
  },
});

export default Tag;
