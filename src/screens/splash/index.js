import * as React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const SplashScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 2500);

    return () => false;
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is splash</Text>
    </View>
  );
};

export default SplashScreen;
