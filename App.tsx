import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

/**
 * TODOS for ImageViewer
 * - Move code to a separate TypeScript component file
 * - Make a control panel for the image viewer
 * - Implement image resizing
 * - Implement image move
 * - Implement image rotation
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [imageURI, setImageURI] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container} onTouchEnd={pickImage}>
      {imageURI ? (
        <Image
          source={{ uri: imageURI }}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      ) : (
        <Text>Touch the screen to pick an image.</Text>
      )}
    </View>
  );
}
