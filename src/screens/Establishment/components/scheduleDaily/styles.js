import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
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
  hourContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    width: '100%',
    height: '100vh',
    justifyContent: 'center',
  },
  contentHoursDays: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'center',
    height: 40,
    fontSize: 17,
    fontFamily: 'Quicksand-SemiBold',
    color: '#131313',
    paddingLeft: 20,
    minHeight:10,
  },
  eyeStyle: {
    position: 'absolute',
    right: 10,
    width: 30,
    bottom: 13,
    color: '#131313',
  },
  viewFlex: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
});
