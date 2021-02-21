import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useWindowDimensions , StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign'

export default function Menu()
{

  const Drawer = createDrawerNavigator();
  const dimensions = useWindowDimensions();
  const isScreenLarge = dimensions.width >= 768;

  return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="App" 
      openByDefault
      drawerStyle={styles.drawerNav} 
      drawerContentOptions={{activeBackgroundColor: '#fff', inactiveTintColor: '#fff'}}
      drawerType={isScreenLarge ? 'permanent' : 'front'}
      overlayColor= "transparent">
        <Drawer.Screen
          name="App"
          component={App}
          options={
            {
              drawerLabel: (({focused}) => <Text style={{ color: focused ? '#313131' : '#fff' }}>Primeira Tela</Text>),
              drawerIcon: (({focused}) => <Icon style={{ color: focused ? '#313131' : '#fff' }} name="home"/>),
            }
          }/>
          <Drawer.Screen
          name="MeuApp"
          component={AppTwo}
          options={
            {
              drawerLabel: (({focused}) => <Text style={{ color: focused ? '#313131' : '#fff' }}>Segunda Tela</Text>),
              drawerIcon: (({focused}) => <Icon style={{ color: focused ? '#313131' : '#fff' }} name="chat"/>),
            }
          }/>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export function App() {

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export function AppTwo() {

  const drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <Text>I see you're already working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerNav: {
    backgroundColor: "#313131",
    paddingVertical: 20
  },
});
