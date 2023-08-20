import UIPanelSlider from 'components/atoms/UIPanelSlider';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upperPart: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    paddingHorizontal: 50,
  },
  underPart: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    paddingHorizontal: 50,
    paddingVertical: 30,
    flex: 0.4,
    alignItems: 'center',
  },
});

interface Props {
  zoomValue: number;
  rotateValue: number;
  xPosValue: number;
  yPosValue: number;
  onZoomChange(newZoomValue: number): void;
  onRotateChange(newRotateValue: number): void;
  onXPosChange(newXPosValue: number): void;
  onYPosChange(newYPosValue: number): void;
}

export default function ControlPanelOverlay({
  zoomValue,
  rotateValue,
  xPosValue,
  yPosValue,
  onZoomChange,
  onRotateChange,
  onXPosChange,
  onYPosChange,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.upperPart} />
      <View style={styles.underPart}>
        <UIPanelSlider
          label="Zoom"
          unit="%"
          value={zoomValue}
          minimum={30}
          maximum={800}
          onValueChange={onZoomChange}
        />
        <UIPanelSlider
          label="Rotate"
          value={rotateValue}
          minimum={0}
          maximum={360}
          onValueChange={onRotateChange}
        />
        <UIPanelSlider
          label="X Position"
          unit="%"
          value={xPosValue}
          minimum={-100}
          maximum={100}
          onValueChange={onXPosChange}
        />
        <UIPanelSlider
          label="Y Position"
          unit="%"
          value={yPosValue}
          minimum={-100}
          maximum={100}
          onValueChange={onYPosChange}
        />
      </View>
    </View>
  );
}
