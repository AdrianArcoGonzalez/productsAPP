import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
const Loading = (): JSX.Element => {
  return (
    <View style={activityStyle.container}>
      <ActivityIndicator size={50} color={'blue'} />
    </View>
  );
};

const activityStyle = StyleSheet.create({
  container: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
