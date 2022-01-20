import * as React from 'react';
import {View, Text, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {storeData} from '../../utils/FirestoreUtils';
import {Button} from '../../components';

const LoginScreen = () => {
  const [userId, setUserId] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const usersCollection = firestore().collection('Users');

  const storeUserData = async () => {
    await storeData()
      .then(() => console.log('Store Success!'))
      .catch(e => console.log('Store Error : ' + e.message));
  };

  return (
    <View style={styles.container}>
      <Text>Hallo Login Screen</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'User ID'}
          onChangeText={text => setUserId(text)}
          value={userId}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Password'}
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
        />
      </View>
      <Button />
    </View>
  );
};

export default LoginScreen;
