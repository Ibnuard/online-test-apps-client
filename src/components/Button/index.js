import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Button = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.textStyle}>Click Here!</Text>
    </TouchableOpacity>
  );
};

export default Button;
