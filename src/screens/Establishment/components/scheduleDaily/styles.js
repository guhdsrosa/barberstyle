import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000'
  },
  dateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    marginBottom: 20,
    marginLeft: 65,
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
    marginTop: 30,
  },
  hourContainer: {
    borderRadius: 10,
    width: '95%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft:10,
    marginTop:10,
    backgroundColor: '#141414'
  },
  contentHoursDays: {
    flexDirection: 'row',
    fontSize: 15,
    fontFamily: 'Quicksand-SemiBold',
    color: '#fff',
  },
  viewFlex: {
    width: '100%',
  },
  backButton: {
    margin: 14,
    zIndex: 1,
    borderRadius: 200,
  },
});
