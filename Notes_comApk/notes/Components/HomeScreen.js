import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import 'react-native-gesture-handler';
import { Notes } from './CurrentNotes'
import styles from './Styles';
import { useState, useEffect } from 'react';
import NotesDB from '../services/sqlite/NotesDB';


export function HomeScreen({route, navigation}) {

  const dimensions = useWindowDimensions();
  const screenWidth = dimensions.width
  const screenHeight = dimensions.height

  var _renderItem = ({item, index}) => (
    <View style={{width: screenWidth, height: 60, alignSelf: 'flex-start', justifyContent: 'flex-start'}}>
      <TouchableOpacity
        style={styles.noteItem}
        onPress={() => {
        console.log(index);
        navigation.navigate('Note', {index : index});
      }}>
        <Text numberOfLines={2} style={[styles.noteText]}>{item.note}</Text>
      </TouchableOpacity>
    </View>
  );

  var renderNoItem = () => {
    return (
      <Text style={{justifyContent: 'center', alignSelf: 'center', fontSize: 30, color: '#000'}} >No Notes</Text>
    )
  }

  const dropTable = () => {
    return (
      NotesDB.drop()
    )
  }

  const [render, setRender] = useState('');

  useEffect(() => {

    NotesDB.findAll()
        .then((response) => { 
          Notes.currentNotes = response;
          setRender({});
         } )
        .catch((err) => console.log(err) )

    const unsubscribe = navigation.addListener('focus', () => {
        setRender({})
      });

    return unsubscribe;
  },);

  return (
    <View contentContainerStyle={styles.container}>
      <FlatList
        contentContainerStyle={Notes.currentNotes.length > 0 ? [styles.noteList, {width: screenWidth}] : styles.noList}
        ListEmptyComponent={renderNoItem}
        keyExtractor={(item, index) => index.toString()}
        data={Notes.currentNotes}
        renderItem={_renderItem}
      />
    </View>
  );
}