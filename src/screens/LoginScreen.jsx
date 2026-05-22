import React, {useCallback, useMemo, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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

  const handleSocialPress = useCallback(provider => {
    Alert.alert('Social Login', `${provider} login is not wired in this demo.`);
  }, []);

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
            <Text style={styles.logo}>Pliē</Text>
            <View style={styles.imagePlaceholder}>
              <Icon
                family="ionicons"
                name="image-outline"
                size={80}
                color="#666666"
              />
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
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.signInRow}>
              <Button
                title="Sign In"
                loading={loading}
                disabled={!canSubmit}
                onPress={handleSignIn}
              />
            </View>

            <Text style={styles.signUpText}>
              Not a member?{' '}
              <Text style={styles.signUpLink}>Sign Up Here</Text>
            </Text>

            <Divider label="or Sign In with:" />

            <View style={styles.socialRow}>
              <SocialButton
                type="google"
                onPress={() => handleSocialPress('Google')}
              />
              <SocialButton
                type="apple"
                onPress={() => handleSocialPress('Apple')}
              />
              <SocialButton
                type="facebook"
                onPress={() => handleSocialPress('Facebook')}
              />
            </View>

            <TouchableOpacity style={styles.guestWrap}>
              <Text style={styles.guestText}>Enter as Guest</Text>
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
    fontWeight: '300',
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
    fontWeight: '500',
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
