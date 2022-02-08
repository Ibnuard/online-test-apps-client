import * as React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Button, Input} from '../../components';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';

const AdminPassScreen = ({navigation, route}) => {
  const [adminPass, setAdminPass] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState();
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState('');
  const [updateUser, setUpdateUser] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [keyword, setKeyword] = React.useState('');

  React.useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setIsLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [updateUser]);

  React.useEffect(() => {
    return () => filteredArray();
  }, [keyword]);

  function filteredArray() {
    console.log('filtering...');
    if (users && keyword.length) {
      const res = users.filter(function (item) {
        const uid = item?.userId.toLowerCase();
        const key = keyword.toLowerCase();
        return uid.includes(key);
      });
      return res;
    } else return users;
  }

  async function updateStatus(id) {
    console.log('Updating status : ' + id);
    await firestore()
      .collection('Users')
      .doc(id)
      .update({
        loginStatus: 0,
      })
      .then(() => {
        setSelectedId('');
      });
  }

  async function deleteUser(id) {
    await firestore()
      .collection('Users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
        setUpdateUser(updateUser + 1);
      });
  }

  function checkPass() {
    setErrorMessage();
    if (adminPass == '123789') {
      setIsAdmin(true);
    } else {
      setErrorMessage('kode admin salah!');
    }
  }

  function onLogoutPress(id) {
    setSelectedId(id);
    updateStatus(id);
  }

  function onDeletingUser(id) {
    setIsLoading(true);
    deleteUser(id);
  }

  function renderSecurity() {
    return (
      <>
        <Input
          placeholder={'kode admin'}
          onChangeText={text => setAdminPass(text)}
          value={adminPass}
          errorMessage={errorMessage}
        />
        <Button
          disabled={!adminPass}
          title={'Lanjut'}
          containerStyle={styles.button}
          onPress={() => checkPass()}
        />
      </>
    );
  }

  function renderList() {
    return (
      <View>
        <Button
          title={'+ Tambah User'}
          onPress={() => navigation.navigate('AddUser')}
        />
        <Input
          placeholder={'Cari User...'}
          onChangeText={text => setKeyword(text)}
          value={keyword}
        />
        <Text style={styles.textDesc}>Tekan lama untuk menghapus user</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={filteredArray()}
            contentContainerStyle={styles.flatList}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.cardList}
                onLongPress={() => onDeletingUser(item.userId)}>
                <View style={styles.leftCard}>
                  <View
                    style={
                      item?.loginStatus == 1
                        ? styles.onlineStatus
                        : styles.offlineStatus
                    }
                  />
                  <Text style={styles.textId}>{item.userId}</Text>
                </View>

                {item?.loginStatus == 1 && selectedId !== item.userId && (
                  <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => onLogoutPress(item?.userId)}>
                    <Text style={styles.textLogout}>Logout</Text>
                  </TouchableOpacity>
                )}
                {selectedId == item.userId && (
                  <ActivityIndicator size={'small'} />
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAdmin ? renderList() : renderSecurity()}
    </View>
  );
};

export default AdminPassScreen;
