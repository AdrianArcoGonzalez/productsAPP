/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

const Background = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#5856D6',
        width: 1000,
        height: 1200,
        top: -380,
        transform: [
          {
            rotate: '-70deg',
          },
        ],
      }}
    />
  );
};

export default Background;
