import * as React from 'react';
import {View, Text, Image, PermissionsAndroid} from 'react-native';
import {StorageReadData} from '../../utils/StorageUtils';
import Logo from '../../assets/logo.png';
import styles from './styles';
import {readDataOnce} from '../../utils/FirestoreUtils';
import {LOGIN_URL} from '../../api/env';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    requestGeolocationPermission();
    //checkData();
  }, []);

  function gotoAuth() {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 2000);
  }

  function gotoHome(userId, userPassword, userToken) {
    setTimeout(() => {
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
    }, 2000);
  }

  const requestGeolocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        checkData();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkData = async () => {
    const data = await StorageReadData('auth', true);

    if (data?.userId) {
      console.log('Data Ada');
      checkOnlineStatus(data);
    } else {
      gotoAuth();
      console.log('Data Tidak Ada');
    }

    console.log('Data : ' + JSON.stringify(data));
  };

  const checkOnlineStatus = async data => {
    await readDataOnce('Users', data?.userId).then(snapshot => {
      const data = snapshot.data();

      if (data?.loginStatus == 1) {
        gotoHome(data?.userId, data?.userPassword, data?.token);
        //gotoAuth();
      } else {
        gotoAuth();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;
