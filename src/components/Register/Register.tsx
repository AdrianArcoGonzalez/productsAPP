/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect} from 'react';
import {
  View,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useForm} from '../../hooks/useForm';
import registerStyle from './registerStyle';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

const Register = () => {
  const {errorMessage, signUp, removeError} = useContext(AuthContext);

  const {correo, password, nombre, onChange} = useForm({
    nombre: '',
    correo: '',
    password: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    if (errorMessage.length === 0) {
      return;
    }
    Alert.alert('Registro incorrecto', errorMessage, [
      {text: 'Ok', onPress: removeError},
    ]);
  }, [errorMessage]);

  const handleRegister = () => {
    signUp({nombre, correo, password});
    Keyboard.dismiss();
  };

  return (
    <View style={registerStyle.container}>
      <Text style={registerStyle.title}>Register</Text>

      <View style={registerStyle.inputContainer}>
        <Text style={registerStyle.label}>Nombre:</Text>
        <TextInput
          placeholder="Ingrese su nombre"
          placeholderTextColor={'#FFFF'}
          keyboardType={'default'}
          underlineColorAndroid={'white'}
          style={registerStyle.input}
          autoCapitalize={'words'}
          autoCorrect={false}
          value={nombre}
          onChangeText={value => onChange(value, 'nombre')}
          onSubmitEditing={handleRegister}
        />
      </View>

      <View style={registerStyle.inputContainer}>
        <Text style={registerStyle.label}>Email:</Text>
        <TextInput
          placeholder="Ingrese su email"
          placeholderTextColor={'#FFFF'}
          keyboardType={'email-address'}
          underlineColorAndroid={'white'}
          style={registerStyle.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={correo}
          onChangeText={value => onChange(value, 'correo')}
          onSubmitEditing={handleRegister}
        />
      </View>

      <View style={registerStyle.inputContainer}>
        <Text style={registerStyle.label}>Password:</Text>
        <TextInput
          placeholder="*********"
          secureTextEntry
          placeholderTextColor={'#FFFF'}
          underlineColorAndroid={'white'}
          style={registerStyle.input}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={password}
          onChangeText={value => onChange(value, 'password')}
          onSubmitEditing={handleRegister}
        />
      </View>

      <View style={registerStyle.buttonContainer}>
        <TouchableOpacity
          onPress={handleRegister}
          style={registerStyle.button}
          activeOpacity={0.8}>
          <Text style={registerStyle.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...registerStyle.buttonContainer,
          alignSelf: 'flex-end',
          marginRight: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login' as never)}>
          <Text
            style={{
              ...registerStyle.buttonText,
              borderBottomWidth: 1,
              borderBottomColor: 'white',
            }}>
            Ya tengo una cuenta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
