import * as React from 'react';
import {SafeAreaView, View} from 'react-native';
import {WebView} from 'react-native-webview';

const HomeScreen = ({navigation, route}) => {
  const URL = route.params.data;

  console.log('PARAMETER : ' + URL);

  return (
    <WebView
      source={{
        uri: URL,
      }}
      geolocationEnabled={true}
    />
  );
};

export default HomeScreen;
