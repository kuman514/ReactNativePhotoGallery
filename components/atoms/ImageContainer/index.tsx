import { Image, Text } from 'react-native';

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
    <Text>No image loaded yet.</Text>
  );
}
