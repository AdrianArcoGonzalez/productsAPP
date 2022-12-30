import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../Screens/ProductsScreen';
import DetailsScreen from '../Screens/DetailsScreen';

export type ProductsStackParams = {
  Products: undefined;
  Detail: {id?: string; name?: string};
};
const Stack = createStackNavigator<ProductsStackParams>();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: 'white',
        },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
      }}>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Detail" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
