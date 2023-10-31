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
    marginTop: -30,
  },
  hourContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    borderRadius: 20,
    width: '95%',
    minHeight: 40,
    padding: 10,
    marginLeft:10,
    marginTop:10,
  },
  contentHoursDays: {
    flexDirection: 'row',
    fontSize: 17,
    fontFamily: 'Quicksand-SemiBold',
    color: '#131313',
  },
  viewFlex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
   
  },
  backButton: {
    margin: 14,
    zIndex: 1,
    borderRadius: 200,
  },
});
