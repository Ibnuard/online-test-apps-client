import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import {readDataOnce, storeData} from '../../utils/FirestoreUtils';
import {Button, Input} from '../../components';

const LoginScreen = ({navigation}) => {
  const [userId, setUserId] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  const getData = async () => {
    setErrorMessage('');
    setIsLoading(true);

    await readDataOnce('Users', userId)
      .then(snapshot => {
        const data = snapshot?.data();
        if (data) {
          console.log('data : ' + JSON.stringify(data));
          if (data.loginStatus == 0) {
            data.userPassword == userPassword
              ? navigateToHome()
              : setErrorMessage('Password tidak sesuai!');
          } else {
            setErrorMessage('Sudah login di tempat lain!');
          }
        } else {
          console.log('Data not exist!');
          setErrorMessage('Data tidak ditemukan!');
        }
      })
      .catch(err => {
        console.log('Error : ' + err.message);
      });

    //setResult(user);
    return () => setIsLoading(false);
  };

  const navigateToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
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
          placeholder={'Password'}
          onChangeText={text => setUserPassword(text)}
          value={userPassword}
        />
        <Button
          isLoading={isLoading}
          disabled={!userId || !userPassword}
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

export default LoginScreen;
