import { Button, StyleSheet, View } from 'react-native';

import UIPanelSlider from '^/components/atoms/UIPanelSlider';

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
    flex: 0.125,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
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
  isShowControlPanel: boolean;
  zoomValue: number;
  rotateValue: number;
  xPosValue: number;
  yPosValue: number;
  onZoomChange(newZoomValue: number): void;
  onRotateChange(newRotateValue: number): void;
  onXPosChange(newXPosValue: number): void;
  onYPosChange(newYPosValue: number): void;
  onReturn(): void;
}

export default function ControlPanelOverlay({
  isShowControlPanel,
  zoomValue,
  rotateValue,
  xPosValue,
  yPosValue,
  onZoomChange,
  onRotateChange,
  onXPosChange,
  onYPosChange,
  onReturn,
}: Props) {
  return (
    <View
      style={{
        ...styles.container,
        display: isShowControlPanel ? 'flex' : 'none',
      }}
    >
      <View
        style={styles.upperPart}
        onStartShouldSetResponder={() => true}
        onTouchEnd={(event) => {
          event.stopPropagation();
        }}
      >
        <Button title="Return" onPress={onReturn} />
      </View>
      <View
        style={styles.underPart}
        onStartShouldSetResponder={() => true}
        onTouchEnd={(event) => {
          event.stopPropagation();
        }}
      >
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
