import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Loading from '../components/Loading/Loading';
import Logo from '../components/Logo/Logo';

const LoadingScreen = (): JSX.Element => {
  return (
    <View style={loadingScreenStyle.container}>
      <Text style={loadingScreenStyle.title}>Loading...</Text>
      <Logo />
      <Loading />
    </View>
  );
};

const loadingScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
export default LoadingScreen;
