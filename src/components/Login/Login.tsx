/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import loginStyle from './LoginStyle';
import {useForm} from '../../hooks/useForm';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

const Login = () => {
  const navigation = useNavigation();
  const {signIn, errorMessage, removeError} = useContext(AuthContext);
  const {correo, password, onChange} = useForm({
    correo: '',
    password: '',
  });

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Login incorrecto', errorMessage, [
      {text: 'Ok', onPress: removeError},
    ]);
  }, [errorMessage]);

  const handleLogin = () => {
    Keyboard.dismiss();

    signIn({correo, password});
  };

  return (
    <View style={loginStyle.container}>
      <Text style={loginStyle.title}>Login</Text>

      <View style={loginStyle.inputContainer}>
        <Text style={loginStyle.label}>Email:</Text>
        <TextInput
          placeholder="Ingrese su email"
          placeholderTextColor={'#FFFF'}
          keyboardType={'email-address'}
          underlineColorAndroid={'white'}
          style={loginStyle.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={correo}
          onChangeText={value => onChange(value, 'correo')}
          onSubmitEditing={handleLogin}
        />
      </View>

      <View style={loginStyle.inputContainer}>
        <Text style={loginStyle.label}>Password:</Text>
        <TextInput
          placeholder="*********"
          secureTextEntry
          placeholderTextColor={'#FFFF'}
          underlineColorAndroid={'white'}
          style={loginStyle.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={password}
          onChangeText={value => onChange(value, 'password')}
          onSubmitEditing={handleLogin}
        />
      </View>

      <View style={loginStyle.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={loginStyle.button}
          activeOpacity={0.8}>
          <Text style={loginStyle.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={loginStyle.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Register' as never)}>
          <Text style={loginStyle.buttonText}>Nueva cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
