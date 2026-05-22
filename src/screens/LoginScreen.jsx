import React, {useCallback, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Icon from '../components/Icon';
import Input from '../components/Input';
import SocialButton from '../components/SocialButton';
import {colors} from '../constants/colors';
import {useAppDispatch, useAppSelector} from '../hooks/reduxHooks';
import {clearError, login} from '../store/slices/authSlice';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const {loading, error} = useAppSelector(state => state.auth);

  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  );

  const handleSignIn = useCallback(() => {
    dispatch(clearError());
    dispatch(login({email, password}));
  }, [dispatch, email, password]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}>
          <View style={styles.header}>
            <AppText style={styles.logo} weight="light">
              Pliē
            </AppText>
            <View style={styles.imagePlaceholder}>
              <Icon name="image-outline" size={80} color="#666666" />
            </View>
          </View>

          <View style={styles.formSection}>
            <Input
              label="Email"
              placeholder="email@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Password"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              showPasswordToggle
              secureTextEntry
            />

            <TouchableOpacity style={styles.forgotWrap}>
              <AppText style={styles.forgotText} weight="light">
                Forgot Password?
              </AppText>
            </TouchableOpacity>

            {error ? (
              <AppText style={styles.errorText} weight="medium">
                {error}
              </AppText>
            ) : null}

            <View style={styles.signInRow}>
              <Button
                title="Sign In"
                loading={loading}
                disabled={!canSubmit}
                onPress={handleSignIn}
              />
            </View>

            <AppText style={styles.signUpText} weight="regular">
              Not a member?{' '}
              <AppText style={styles.signUpLink} weight="medium">
                Sign Up Here
              </AppText>
            </AppText>

            <Divider label="or Sign In with:" />

            <View style={styles.socialRow}>
              <SocialButton type="google" />
              <SocialButton type="apple" />
              <SocialButton type="facebook" />
            </View>

            <TouchableOpacity style={styles.guestWrap}>
              <AppText style={styles.guestText} weight="light">
                Enter as Guest
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: colors.headerGray,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: 220,
  },
  logo: {
    fontSize: 42,
    color: colors.black,
    letterSpacing: 1,
    marginBottom: 24,
  },
  imagePlaceholder: {
    width: 120,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formSection: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 24,
  },
  forgotWrap: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 12,
    color: colors.textLight,
  },
  signInRow: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.textGray,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: colors.textDark,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  guestWrap: {
    alignSelf: 'flex-end',
  },
  guestText: {
    fontSize: 12,
    color: colors.textLight,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'right',
  },
});

export default LoginScreen;
