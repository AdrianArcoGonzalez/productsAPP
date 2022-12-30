/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, View} from 'react-native';

const Logo = (): JSX.Element => {
  return (
    <View
      style={{
        height: 120,
        alignItems: 'center',
      }}>
      <Image
        style={{width: 110, height: 100}}
        source={require('../../assets/react-logo-white.png')}
      />
    </View>
  );
};

export default Logo;
