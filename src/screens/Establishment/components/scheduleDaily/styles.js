import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loading: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: '60%',
  },

  loadingText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Medium',
    color: '#131313',
    textAlign: 'center',
    marginTop: -30,
  },

  title: {
    fontSize: 24,
    margin: 10,
  },
  buttomAccept: {
    marginVertical: 20,
    marginHorizontal: 10,
  },

  buttomAcceptText: {
    backgroundColor: '#141414',
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 17,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',
    color: '#fff',
  },
})
