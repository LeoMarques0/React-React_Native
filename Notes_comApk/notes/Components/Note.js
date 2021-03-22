import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, ScrollView, View, ImageBackground, useWindowDimensions} from 'react-native';
import 'react-native-gesture-handler';
import { useState } from 'react';
import { Notes } from "./CurrentNotes";
import styles from "./Styles";
import { useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler';
import NotesDB from '../services/sqlite/NotesDB'


export function Note({route, navigation}) {

    const [text, setText] = useState('');
    const index = route.params.index;

    const leftDisabled = index === -1 || index-1 < 0;
    const rightDisabled = index+1 === Notes.currentNotes.length;

    const dimensions = useWindowDimensions();

    var saveNote = true;

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {
          if(saveNote && ((index === -1 && text) || Notes.currentNotes[index])) {
            Notes.PushNote(text ? text : Notes.currentNotes[index].note, index);
          }
          else if(!saveNote)
          {
            Notes.currentNotes.splice(index, 1);
          }
          });

        return unsubscribe;
    });

    const del = () => {
      saveNote = false;
      if(index !== -1)
        NotesDB.remove(Notes.currentNotes[index].id);
      navigation.navigate('Home');
    }

    const goToPreviousNote = () => {
      navigation.navigate('Note', {index : index-1});
    }

    const goToNextNote = () => {
      navigation.navigate('Note', {index : index+1});
    }
  
    return (
      <View style={{flex: 1, width: dimensions.width, height: dimensions.height}}>
        <View style={[styles.container, {flexDirection: 'row', alignItems: 'flex-start', height: '100%'}]}>
            <ScrollView>
              <TextInput
                autoFocus
                style={[styles.noteInput, {marginLeft: '2.5%'}]}
                multiline
                onChangeText={text => {
                      setText(text);
                  }}
                defaultValue={index === -1 ? text : Notes.currentNotes[index].note}
              />
            </ScrollView>
        </View>
        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#303030'}}>

          <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
            <TouchableOpacity disabled={leftDisabled} onPress={goToPreviousNote}>
              <Icon name="left" size={40} color={leftDisabled ? '#999999' : 'white'}/>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={del}>
              <Icon name="delete" size={40} color={'white'}/>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, alignSelf: 'center', alignItems: 'center'}}>
            <TouchableOpacity disabled={rightDisabled} onPress={goToNextNote}>
              <Icon name="right" size={40} color={rightDisabled ? '#999999' : 'white'}/>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    );
  }