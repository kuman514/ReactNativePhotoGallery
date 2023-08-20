import { Slider } from '@rneui/base';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    color: 'white',
    rowGap: 6,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  slider: {
    width: '100%',
  },
});

interface Props {
  label: string;
  unit?: string;
  value: number;
  minimum: number;
  maximum: number;
  onValueChange(newValue: number): void;
}

export default function UIPanelSlider({
  label,
  unit,
  value,
  minimum,
  maximum,
  onValueChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {label}: {Math.floor(value)}
        {unit}
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
