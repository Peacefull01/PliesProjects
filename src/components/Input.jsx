import React, {memo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../constants/colors';
import {cardShadow} from '../utils/shadow';
import EyeIcon from './EyeIcon';

const Input = ({
  label,
  showPasswordToggle = false,
  secureTextEntry,
  ...rest
}) => {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
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
            <EyeIcon visible={!hidden} />
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
    fontWeight: '500',
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
    color: colors.textDark,
    paddingVertical: 10,
  },
  eyeBtn: {
    marginLeft: 8,
    padding: 4,
  },
});

export default memo(Input);
