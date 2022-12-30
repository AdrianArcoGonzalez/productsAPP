import {StyleSheet} from 'react-native';

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
  input: {
    fontSize: 20,
    color: 'white',
  },

  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: 90,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
});

export default loginStyle;
