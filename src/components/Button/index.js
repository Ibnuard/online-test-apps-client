import * as React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';

const Button = props => {
  const {
    containerStyle,
    onPress,
    title = 'Click Here!',
    isLoading,
    disabled,
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.container, //normal styles
        disabled || isLoading ? styles.disabledColor : null, //disabled styles
        containerStyle, //custom styles
      ]}
      activeOpacity={disabled || isLoading ? 1 : 0.6}
      onPress={disabled || isLoading ? null : onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'white'} />
      ) : (
        <Text style={styles.textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
