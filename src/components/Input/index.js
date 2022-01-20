import * as React from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';

const Input = props => {
  const {
    placeholder = 'Placeholder',
    value,
    onChangeText,
    containerStyle,
    errorMessage,
  } = props;

  return (
    <>
      <View style={[containerStyle, styles.container]}>
        <TextInput
          {...props}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </>
  );
};

export default Input;
