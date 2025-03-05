/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, useColorScheme, View} from 'react-native';

import FileViewer from 'react-native-file-viewer';
import Video from 'react-native-video';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  downloadMediaFile,
  fetchRecentChats,
  mirrorflyRegister,
} from './src/SDK/sdkUtils';

const handleFileOpen = uri => {
  FileViewer.open(uri, {
    showAppsSuggestions: true,
  })
    .then(res => {
      console.log('Document opened externally', res);
    })
    .catch(err => {
      console.log('Error while opening Document', err);
    });
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onError = error => {
    console.log('error', error);
  };
  return (
    <>
      <Button
        title="Register"
        onPress={() => {
          console.log('registerRes');
          mirrorflyRegister({userIdentifier: '240688'});
        }}
      />
      <Button
        title="Get Recent Chats"
        onPress={() => {
          fetchRecentChats();
        }}
      />
      <Button
        title="Download Media"
        onPress={() => {
          // "file:///data/user/0/com.awesomeproject/files/Mirrorfly/IMG_678590309043631740659865540gv8Xa9rh0nn479WH94O5.MOV"
          downloadMediaFile('8b62303e-4bb8-167a-af1a-c3a3e189686e');
        }}
      />
      <Button
        title="Open File"
        onPress={() => {
          handleFileOpen(
            'file:///data/user/0/com.awesomeproject/files/Mirrorfly/IMG_678590309043631740659865540gv8Xa9rh0nn479WH94O5.MOV',
          );
        }}
      />
      <View style={{flex: 1}}>
        <Video
          onError={onError}
          controls={true}
          ignoreSilentSwitch={'ignore'}
          resizeMode={'contain'}
          source={{
            uri: 'file:///data/user/0/com.awesomeproject/files/Mirrorfly/IMG_678590309043631740659865540gv8Xa9rh0nn479WH94O5.MOV',
          }}
          volume={100}
          muted={false}
          style={[styles.videoContainer]}
          useSoftwareDecoder={true} // Tries software decoding
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
