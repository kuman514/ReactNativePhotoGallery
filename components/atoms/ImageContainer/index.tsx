import { Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyText: {
    color: '#ffffff',
  },
});

interface Props {
  zoom: number;
  rotate: number;
  imageURI?: string;
}

export default function ImageContainer({ imageURI, zoom, rotate }: Props) {
  return imageURI !== undefined ? (
    <Image
      source={{ uri: imageURI }}
      style={{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        transform: [{ scale: zoom / 100 }, { rotate: `${rotate}deg` }],
      }}
    />
  ) : (
    <Text style={styles.emptyText}>Touch to load an image.</Text>
  );
}
