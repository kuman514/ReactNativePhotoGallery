import * as ImagePicker from 'expo-image-picker';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect, useState } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';

import ImageContainer from '^/components/atoms/ImageContainer';
import ControlPanelOverlay from '^/components/molecules/ControlPanelOverlay';
import { INIT_ROTATE_VALUE } from '^/constants';

LogBox.ignoreLogs(['new NativeEventEmitter']);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  const [imageURI, setImageURI] = useState<string | undefined>(undefined);

  const [isShowControlPanel, setIsShowControlPanel] = useState<boolean>(false);
  const [rotateValue, setRotateValue] = useState<number>(INIT_ROTATE_VALUE);

  const pickAndGetImageURI = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      return result.assets[0].uri;
    }
  };

  const pickImage = async () => {
    setImageURI(await pickAndGetImageURI());
  };

  const loadAnotherImage = async () => {
    const imageURI = await pickAndGetImageURI();
    if (imageURI === undefined) {
      return;
    }

    setIsShowControlPanel(!isShowControlPanel);
    setRotateValue(INIT_ROTATE_VALUE);
    setImageURI(imageURI);
  };

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        if (imageURI === undefined) {
          pickImage();
        }
      }}
    >
      <ImageContainer
        onTap={() => setIsShowControlPanel(!isShowControlPanel)}
        imageURI={imageURI}
        rotate={rotateValue}
      />
      <ControlPanelOverlay
        isShowControlPanel={isShowControlPanel}
        rotateValue={rotateValue}
        onRotateChange={setRotateValue}
        onLoadAnotherImage={loadAnotherImage}
      />
    </View>
  );
}
