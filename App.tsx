import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/Navigator/Navigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthContextProvider from './src/context/AuthContext';
import {ProductsProvider} from './src/context/ProductsContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <ProductsProvider>
          <Navigator />
        </ProductsProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
};

export default App;
