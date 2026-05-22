import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/colors';

const PlaceholderScreen = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.hint}>Coming soon in this demo</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  hint: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textGray,
  },
});

export default PlaceholderScreen;
