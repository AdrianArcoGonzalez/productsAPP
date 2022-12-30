/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Background from '../components/Background/Background';
import Login from '../components/Login/Login';
import Logo from '../components/Logo/Logo';
import {KeyboardAvoidingView, View, Platform} from 'react-native';

const LoginScreen = () => {
  return (
    <>
      <Background />
      <View
        style={{
          height: 500,
          justifyContent: 'center',
          marginTop: 50,
          paddingVertical: 30,
        }}>
        <Logo />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Login />
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default LoginScreen;
