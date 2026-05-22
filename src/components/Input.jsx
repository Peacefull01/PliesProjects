import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from './AppText';
import Icon from './Icon';
import {colors} from '../constants/colors';
import {fonts} from '../constants/fonts';
import {cardShadow} from '../utils/shadow';

const Input = ({label, showPasswordToggle = false, secureTextEntry, ...rest}) => {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View style={styles.wrapper}>
      <AppText style={styles.label} weight="medium">
        {label}
      </AppText>
      <View style={[styles.inputBox, cardShadow]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={showPasswordToggle ? hidden : secureTextEntry}
          {...rest}
        />
        {showPasswordToggle && (
          <TouchableOpacity
            onPress={() => setHidden(prev => !prev)}
            style={styles.eyeBtn}
            hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
            <Icon
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.textGray}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: colors.textDark,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 14,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: fonts.regular,
    color: colors.textDark,
    paddingVertical: 10,
  },
  eyeBtn: {
    marginLeft: 8,
    padding: 4,
  },
});

export default Input;
