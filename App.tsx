import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ImageContainer from '^/components/atoms/ImageContainer';
import ControlPanelOverlay from '^/components/molecules/ControlPanelOverlay';
import {
  INIT_ZOOM_VALUE,
  INIT_X_POS_VALUE,
  INIT_Y_POS_VALUE,
  INIT_ROTATE_VALUE,
} from '^/constants';

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
  const [zoomValue, setZoomValue] = useState<number>(INIT_ZOOM_VALUE);
  const [rotateValue, setRotateValue] = useState<number>(INIT_ROTATE_VALUE);
  const [xPosValue, setXPosValue] = useState<number>(INIT_X_POS_VALUE);
  const [yPosValue, setYPosValue] = useState<number>(INIT_Y_POS_VALUE);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  const resetImage = () => {
    setIsShowControlPanel(!isShowControlPanel);
    setZoomValue(INIT_ZOOM_VALUE);
    setRotateValue(INIT_ROTATE_VALUE);
    setXPosValue(INIT_X_POS_VALUE);
    setYPosValue(INIT_Y_POS_VALUE);
    setImageURI(undefined);
  };

  return (
    <View
      style={styles.container}
      onTouchEnd={() => {
        if (imageURI === undefined) {
          pickImage();
          return;
        }
        setIsShowControlPanel(!isShowControlPanel);
      }}
    >
      <ImageContainer
        imageURI={imageURI}
        zoom={zoomValue}
        rotate={rotateValue}
        xPosPercentage={xPosValue}
        yPosPercentage={yPosValue}
      />
      <ControlPanelOverlay
        isShowControlPanel={isShowControlPanel}
        zoomValue={zoomValue}
        rotateValue={rotateValue}
        xPosValue={xPosValue}
        yPosValue={yPosValue}
        onZoomChange={setZoomValue}
        onRotateChange={setRotateValue}
        onXPosChange={setXPosValue}
        onYPosChange={setYPosValue}
        onReturn={resetImage}
      />
    </View>
  );
}
