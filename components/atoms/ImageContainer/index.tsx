import { useRef } from 'react';
import { Image, Text, StyleSheet, PanResponder, Animated } from 'react-native';

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
  imageURI?: string;
}

export default function ImageContainer({ imageURI, zoom, rotate }: Props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
      },
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return imageURI !== undefined ? (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        ...styles.container,
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
    >
      <Image
        source={{ uri: imageURI }}
        style={{
          ...styles.image,
          transform: [{ scale: zoom / 100 }, { rotate: `${rotate}deg` }],
        }}
      />
    </Animated.View>
  ) : (
    <Text style={styles.emptyText}>Touch to load an image.</Text>
  );
}
