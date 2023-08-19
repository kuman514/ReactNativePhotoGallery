import { Slider } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
  },
});

interface Props {
  label: string;
  value: number;
  minimum: number;
  maximum: number;
  onValueChange(newValue: number): void;
}

export default function UIPanelSlider({
  label,
  value,
  minimum,
  maximum,
  onValueChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text>
        {label}: {Math.floor(value)}
      </Text>
      <Slider
        style={styles.slider}
        allowTouchTrack
        value={value}
        minimumValue={minimum}
        maximumValue={maximum}
        onValueChange={onValueChange}
      />
    </View>
  );
}
