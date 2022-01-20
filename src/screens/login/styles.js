import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 24,
  },

  inputContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
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
});

export default styles;
