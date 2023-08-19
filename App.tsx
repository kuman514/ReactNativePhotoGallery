import ImageContainer from 'components/atoms/ImageContainer';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * TODOS for ImageViewer
 * - Move code to a separate TypeScript component file (completed)
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
  const [imageURI, setImageURI] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container} onTouchEnd={pickImage}>
      <ImageContainer imageURI={imageURI} />
    </View>
  );
}
