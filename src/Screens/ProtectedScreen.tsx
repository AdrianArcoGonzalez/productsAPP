import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const ProtectedScreen = () => {
  const {user, token, logout} = useContext(AuthContext);

  return (
    <View style={protectedScreenStyle.container}>
      <Text style={protectedScreenStyle.title}>ProtectedScreen</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={protectedScreenStyle.button}
        onPress={logout}>
        <Text style={protectedScreenStyle.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Text style={protectedScreenStyle.info}>
        {JSON.stringify(user, null, 5)}
      </Text>
      <Text style={protectedScreenStyle.info}>
        {JSON.stringify(token, null, 5)}
      </Text>
    </View>
  );
};

const protectedScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    backgroundColor: 'blue',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    height: 40,
    width: 100,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  info: {
    fontSize: 15,
    color: 'black',
    paddingHorizontal: 20,
  },
});

export default ProtectedScreen;
