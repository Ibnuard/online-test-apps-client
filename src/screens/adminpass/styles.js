import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 24,
  },

  onlineStatus: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'green',
  },

  offlineStatus: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },

  leftCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoutButton: {
    paddingHorizontal: 8,
  },

  textId: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  textLogout: {
    color: 'red',
  },

  cardList: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
  },

  flatList: {
    marginBottom: 60,
    paddingTop: 14,
  },

  button: {
    marginTop: 24,
  },
});

export default styles;
