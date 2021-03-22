import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';


export default StyleSheet.create({
    container: {
      flex: 7,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    noteInput: {
      flex: 7,
      marginTop: 10,
      fontSize: 20,
      flexDirection: 'row',
      width: '95%',
      justifyContent: 'flex-start',
    },
    noteBackground: {
      resizeMode: 'repeat',
    },
    noteFont: {
      color: '#000',
    },
    noteList: {
      marginBottom: 20,
      backgroundColor: 'white',
    },
    noList: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noteItem: {
      height: '100%',
      width: '100%',
      backgroundColor: '#f2f2f2',
      borderBottomWidth: 2,
      justifyContent: 'flex-start',
      alignSelf: 'center',
    },
    noteText: {
      fontSize: 20,
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
    }
  });