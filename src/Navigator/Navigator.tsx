import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import LoadingScreen from '../Screens/LoadingScreen';
import ProductsNavigator from './ProductsNavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  const {status} = useContext(AuthContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {status === 'checking' && (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      )}
      {status === 'athenticated' && (
        <Stack.Screen name="ProductsNavigator" component={ProductsNavigator} />
      )}

      {status === 'not-authenticated' && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
