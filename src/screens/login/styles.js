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
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },

  buttonContainer: {marginVertical: 18},

  errorContainer: {
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
  },
});

export default styles;
