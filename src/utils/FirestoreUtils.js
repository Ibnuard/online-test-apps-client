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

//read data by collection / docs
export const readDataOnce = async (collection, id) => {
  if (id) {
    //get all data from collection
    const result = await firestore().collection(collection).doc(id).get();
    return result;
  } else {
    //get data from doc under collection
    const result = await firestore().collection(collection).get();
    return result;
  }
};

//update data
export const updateData = async (collection, id, data) => {
  return await firestore().collection(collection).doc(id).update(data);
};
