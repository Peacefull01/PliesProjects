import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import {colors} from '../constants/colors';

const PlaceholderScreen = ({title}) => (
  <View style={styles.container}>
    <AppText style={styles.text} weight="semiBold">
      {title}
    </AppText>
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
    color: colors.textDark,
  },
});

export default PlaceholderScreen;
