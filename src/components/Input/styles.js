import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS == 'ios' ? 16 : 0,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,

    elevation: 4,
  },

  input: {
    color: 'black',
  },

  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
});

export default styles;
