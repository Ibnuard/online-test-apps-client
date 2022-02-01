//Storage Utility
import RNSecureStorage from 'react-native-secure-storage';

//store parameter
const storeParams = {
  keychainService: 'IOS_KEYCHAIN',
  sharedPreferencesName: 'ANDROID_KEYSTORE',
};

//Save Data
const StorageStoreData = async (key, data, isJson = false) => {
  await RNSecureStorage.setItem(
    key,
    isJson ? JSON.stringify(data) : data,
    storeParams,
  );
};

//Retrive Data
const StorageReadData = async (key, isJson = false) => {
  const result = await RNSecureStorage.getItem(key, storeParams);

  return isJson ? JSON.parse(result) : result;
};

//Delete Data
const StorageRemoveData = async key => {
  await RNSecureStorage.deleteItem(key, storeParams);
};

export {StorageReadData, StorageStoreData, StorageRemoveData};
