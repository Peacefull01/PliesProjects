import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/colors';

const Tag = ({label}) => (
  <View style={styles.tag}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  tag: {
    backgroundColor: colors.tagBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  text: {
    fontSize: 11,
    color: colors.tagText,
    fontWeight: '500',
  },
});

export default memo(Tag);
