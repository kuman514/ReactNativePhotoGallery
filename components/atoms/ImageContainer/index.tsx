import { Image, Text } from 'react-native';

interface Props {
  imageURI?: string;
}

export default function ImageContainer({ imageURI }: Props) {
  return imageURI !== undefined ? (
    <Image
      source={{ uri: imageURI }}
      style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
    />
  ) : (
    <Text>No image loaded yet.</Text>
  );
}
