import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, View, LogBox, Platform, StatusBar } from 'react-native';

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

  /**
   * Android has some issues where black bar happens with hidden StatusBar.
   * So, I had to apply the hidden StatusBar for iOS first,
   * and then apply alternative way to hide StatusBar for Android.
   */
  const isStatusBarHiddenForIos =
    Platform.OS === 'ios' && !isShowControlPanel && imageURI !== undefined;

  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        if (imageURI === undefined) {
          pickImage();
        }
      }}
    >
      <StatusBar hidden={isStatusBarHiddenForIos} />
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
