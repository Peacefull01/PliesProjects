import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import AppText from './AppText';
import {colors} from '../constants/colors';

const Button = ({
  title,
  loading = false,
  variant = 'primary',
  containerStyle,
  disabled,
  ...rest
}) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.outline,
        (disabled || loading) && styles.disabled,
        containerStyle,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
      ) : (
        <AppText
          weight="semiBold"
          style={[styles.text, isPrimary ? styles.primaryText : styles.outlineText]}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: 15,
  },
  primaryText: {
    color: colors.white,
  },
  outlineText: {
    color: colors.textDark,
  },
});

export default Button;
