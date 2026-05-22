import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import {colors} from '../constants/colors';

const Divider = ({label}) => (
  <View style={styles.row}>
    <View style={styles.line} />
    <AppText style={styles.label} weight="regular">
      {label}
    </AppText>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  label: {
    marginHorizontal: 12,
    fontSize: 12,
    color: colors.textGray,
  },
});

export default Divider;
