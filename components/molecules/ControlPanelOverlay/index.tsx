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
    pointerEvents: 'box-none',
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
    flex: 0.2,
    alignItems: 'center',
  },
});

interface Props {
  isShowControlPanel: boolean;
  rotateValue: number;
  onRotateChange(newRotateValue: number): void;
  onLoadAnotherImage(): void;
}

export default function ControlPanelOverlay({
  isShowControlPanel,
  rotateValue,
  onRotateChange,
  onLoadAnotherImage,
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
        <Button title="Another Image" onPress={onLoadAnotherImage} />
      </View>
      <View
        style={styles.underPart}
        onStartShouldSetResponder={() => true}
        onTouchEnd={(event) => {
          event.stopPropagation();
        }}
      >
        <UIPanelSlider
          label="Rotate"
          value={rotateValue}
          minimum={0}
          maximum={360}
          onValueChange={onRotateChange}
        />
      </View>
    </View>
  );
}
