import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  containerFlex: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 24,
  },

  textWelcome: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  textVersion: {
    color: 'black',
  },

  versionButton: {
    alignSelf: 'center',
  },

  buttonContainer: {marginVertical: 32},

  errorContainer: {
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
  },
});

export default styles;
