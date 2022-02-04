import * as React from 'react';
import {View, Text, Image, PermissionsAndroid} from 'react-native';
import {StorageReadData} from '../../utils/StorageUtils';
import Logo from '../../assets/logo.png';
import styles from './styles';

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
    }, 2500);
  }

  const requestGeolocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        gotoAuth();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const checkData = async () => {
    const data = await StorageReadData('auth', true);

    console.log('Data : ' + JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

export default SplashScreen;
