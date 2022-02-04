import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {readDataOnce, storeData, updateData} from '../../utils/FirestoreUtils';
import {Button, Input} from '../../components';
import {StorageStoreData} from '../../utils/StorageUtils';
import {LOGIN_URL} from '../../api/env';

const AddUserScreen = ({navigation}) => {
  const [userId, setUserId] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [userToken, setUserToken] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const getData = async () => {
    Keyboard.dismiss();

    setErrorMessage('');
    setIsLoading(true);

    await readDataOnce('Users', userId)
      .then(snapshot => {
        const data = snapshot?.data();
        if (data) {
          setIsLoading(false);
          setErrorMessage('UserId sudah ada!');
        } else {
          registerUser();
        }
      })
      .catch(err => {
        console.log('Error : ' + err.message);
      });

    //setResult(user);
    return () => setIsLoading(false);
  };

  async function registerUser() {
    const data = {
      userId: userId,
      userPassword: userPassword,
      token: userToken,
      loginStatus: 0,
    };

    await storeData('Users', data, userId).then(() => {
      navigation.goBack();
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFlex}>
        <Text style={styles.textWelcome}>Tambah</Text>
        <Input
          placeholder={'User ID'}
          onChangeText={text => setUserId(text)}
          value={userId}
        />
        <Input
          placeholder={'Password'}
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
        />

        <Input
          placeholder={'Token'}
          onChangeText={text => setUserToken(text)}
          value={userToken}
        />

        <Button
          isLoading={isLoading}
          disabled={!userId || !userPassword || !userToken}
          title={'Masuk'}
          containerStyle={styles.buttonContainer}
          onPress={() => getData()}
        />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddUserScreen;
