import ImageContainer from 'components/atoms/ImageContainer';
import ControlPanelOverlay from 'components/molecules/ControlPanelOverlay';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

/**
 * TODOS for ImageViewer
 * - Move code to a separate TypeScript component file (completed)
 * - Make a control panel for the image viewer (completed)
 * - Implement image resizing (completed)
 * - Implement image rotation (completed)
 * - Implement image move (completed)
 * - Implement loading another image
 * - Add touch interactions for resizing, move, and roation
 * - Make consistent color code style
 * - Support landscape
 */

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
  const [zoomValue, setZoomValue] = useState<number>(100);
  const [rotateValue, setRotateValue] = useState<number>(0);
  const [xPosValue, setXPosValue] = useState<number>(0);
  const [yPosValue, setYPosValue] = useState<number>(0);

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
      />
    </View>
  );
}
