/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import Background from '../components/Background/Background';
import Logo from '../components/Logo/Logo';
import Register from '../components/Register/Register';

const RegisterScreen = () => {
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
          <Register />
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default RegisterScreen;
