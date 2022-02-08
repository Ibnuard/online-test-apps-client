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

const LoginScreen = ({navigation}) => {
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
          console.log('data : ' + JSON.stringify(data));
          if (data.loginStatus == 0) {
            data.userPassword == userPassword
              ? checkToken(data.token)
              : setErrorMessage('Password tidak sesuai!');
          } else {
            setIsLoading(false);
            setErrorMessage('Sudah login di tempat lain!');
          }
        } else {
          console.log('Data not exist!');
          setIsLoading(false);
          setErrorMessage('Data tidak ditemukan!');
        }
      })
      .catch(err => {
        console.log('Error : ' + err.message);
      });

    //setResult(user);
    return () => setIsLoading(false);
  };

  const navigateToHome = async () => {
    await updateData('Users', userId, {loginStatus: 1}).then(() => {
      saveData();
    });
  };

  const checkToken = token => {
    if (token == userToken) {
      navigateToHome();
    } else {
      setIsLoading(false);
      setErrorMessage('Token salah!');
    }
  };

  const saveData = async () => {
    const data = {
      userId: userId,
      password: userPassword,
      token: userToken,
    };

    await StorageStoreData('auth', data, true);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: {
            data: LOGIN_URL(userId, userPassword, userToken),
          },
        },
      ],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerFlex}>
        <Text style={styles.textWelcome}>Masuk</Text>
        <Input
          placeholder={'User ID'}
          onChangeText={text => setUserId(text)}
          value={userId}
        />
        <Input
          isPassword
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
        <TouchableOpacity
          style={styles.versionButton}
          onLongPress={() => navigation.navigate('AdminPass')}>
          <Text style={styles.textVersion}>v1.0</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
