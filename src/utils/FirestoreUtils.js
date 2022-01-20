import firestore from '@react-native-firebase/firestore';

//storing data to firestore
export const storeData = async (collection, data, id) => {
  //check if id available
  if (id) {
    //store data with id
    return await firestore().collection(collection).doc(id).set(data);
  } else {
    //store data with unique id
    return await firestore().collection(collection).add(data);
  }
};
