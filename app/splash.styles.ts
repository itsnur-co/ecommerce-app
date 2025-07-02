import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Sagita',
    fontSize: 48,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    fontFamily: 'Sagita',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonText: {
    fontFamily: 'Sagita',
    color: '#fff',
    backgroundColor: '#000',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '500',
    marginRight: 8,
  },
  arrow: {
    color: '#000',
    fontSize: 28,
    marginLeft: 2,
  },
});

export default styles; 