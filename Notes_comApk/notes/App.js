import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { HomeScreen, Note, Notes } from './Components/Index';
import NotesDB from './services/sqlite/NotesDB';
import { useEffect } from 'react';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    console.debug('here');
    NotesDB.createTable();
  },[])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={({navigation, route}) => ({
          headerTintColor: '#ffffff',
          headerStyle: {backgroundColor: '#303030'},
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Note', {index : -1})}>
              <Text style={{color: '#ffffff', fontSize: 30, paddingRight: 20}}>+</Text>  
            </TouchableOpacity>
          ),
        })} 
        />
        <Stack.Screen name="Note" component={Note} options={({navigation}) => ({
          headerTintColor: '#ffffff',
          headerStyle: {backgroundColor: '#303030'},
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={{color: '#ffffff', fontSize: 20, paddingRight: 20}}>Done</Text>  
            </TouchableOpacity>
          ),
          
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
