import {
  Image,
  Text,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
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
    <View
      style={{
        ...styles.container,
        transform: [
          {
            translateX: (xPosPercentage / 100) * windowWidth,
          },
          {
            translateY: (yPosPercentage / 100) * windowHeight,
          },
        ],
      }}
    >
      <Image
        source={{ uri: imageURI }}
        style={{
          ...styles.image,
          transform: [{ scale: zoom / 100 }, { rotate: `${rotate}deg` }],
        }}
      />
    </View>
  ) : (
    <Text style={styles.emptyText}>Touch to load an image.</Text>
  );
}
