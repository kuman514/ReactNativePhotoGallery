import { useRef, useState } from 'react';
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
  rotate: number;
  imageURI?: string;
}

export default function ImageContainer({ imageURI, rotate }: Props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [zoom, setZoom] = useState<number>(100);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, { dx, dy, numberActiveTouches, vx, vy }) => {
        switch (numberActiveTouches) {
          case 1:
            pan.setValue({
              x: dx,
              y: dy,
            });
            break;
          case 2:
            {
              const left = Math.min(
                event.nativeEvent.touches[0].pageX,
                event.nativeEvent.touches[1].pageX
              );
              const right = Math.max(
                event.nativeEvent.touches[0].pageX,
                event.nativeEvent.touches[1].pageX
              );
              const top = Math.min(
                event.nativeEvent.touches[0].pageY,
                event.nativeEvent.touches[1].pageY
              );
              const bottom = Math.max(
                event.nativeEvent.touches[0].pageY,
                event.nativeEvent.touches[1].pageY
              );
              const dist = Math.sqrt(
                right * right - left * left + bottom * bottom - top * top
              );
              setZoom(dist);
            }
            break;
          default:
            break;
        }
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
