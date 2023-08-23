import { Image, Text, StyleSheet, useWindowDimensions } from 'react-native';

const styles = StyleSheet.create({
  emptyText: {
    color: '#ffffff',
  },
});

interface Props {
  zoom: number;
  rotate: number;
  xPosPercentage: number;
  yPosPercentage: number;
  imageURI?: string;
}

export default function ImageContainer({
  imageURI,
  zoom,
  rotate,
  xPosPercentage,
  yPosPercentage,
}: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  return imageURI !== undefined ? (
    <Image
      source={{ uri: imageURI }}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        transform: [
          { scale: zoom / 100 },
          { rotate: `${rotate}deg` },
          { translateX: (xPosPercentage / 100) * windowWidth },
          { translateY: (yPosPercentage / 100) * windowHeight },
        ],
      }}
    />
  ) : (
    <Text style={styles.emptyText}>Touch to load an image.</Text>
  );
}
