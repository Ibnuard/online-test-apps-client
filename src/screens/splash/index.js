import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {StorageReadData} from '../../utils/StorageUtils';
import styles from './styles';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 2500);
    //checkData();
  }, []);

  const checkData = async () => {
    const data = await StorageReadData('auth', true);

    console.log('Data : ' + JSON.stringify(data));
  };

  return (
    <View style={styles.container}>
      <Text>This is splash</Text>
    </View>
  );
};

export default SplashScreen;
