import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>Hallo</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Navigate to Login Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
