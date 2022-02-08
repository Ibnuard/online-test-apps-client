import * as React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const Input = props => {
  const {
    placeholder = 'Placeholder',
    value,
    onChangeText,
    containerStyle,
    errorMessage,
  } = props;

  const [passwordShow, setPasswordShow] = React.useState(true);

  return (
    <>
      <View style={[containerStyle, styles.container]}>
        <TextInput
          {...props}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
          onChangeText={onChangeText}
          secureTextEntry={props?.isPassword && passwordShow}
          value={value}
        />
        {props?.isPassword && (
          <TouchableOpacity onPress={() => setPasswordShow(!passwordShow)}>
            <Text style={{color: 'blue'}}>
              {passwordShow ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </>
  );
};

export default Input;
