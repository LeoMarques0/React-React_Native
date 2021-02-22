import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {
const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false)
    {
      alert("Permission to access camera roll is required");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.cancelled === true) {
      return;
    }
    
    if(Platform.OS === 'web')
    {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    }
    else
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });

    };

    let openShareDialogAsync = async () => {
      if (!(await Sharing.isAvailableAsync())){
        alert(`The image is avaiable for sharing at: ${selectedImage.remoteUri}`);
        return;
      }

      await Sharing.shareAsync(selectedImage.localUri);
    };

    let clearImageState = async () => {
      setSelectedImage(null);
    }


  if(selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}/>
          <PressableButton onPress={openShareDialogAsync} buttonText="Share this photo" />
          <PressableButton onPress={clearImageState} buttonText="Choose other photo" />
          
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo}></Image>

      <Text style={styles.instructions}>
        To share a photos from your phone with a friend, just press the button below!
        </Text>
        <PressableButton onPress={openImagePickerAsync} buttonText="Pick a photo" />

      <StatusBar style="auto" />
    </View>
  );
}

function PressableButton(props)
{
  return <TouchableOpacity onPress={props.onPress} style={styles.button}>
    <Text style={styles.buttonText}>{props.buttonText}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain"
  },
});
