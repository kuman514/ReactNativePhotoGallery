import { useRef } from 'react';
import { Image, Text, StyleSheet, PanResponder, Animated } from 'react-native';

import { ConvertAnimatedValueToNumber } from '^/utils';

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
  const recentDist = useRef(new Animated.Value(-1)).current;
  const zoom = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, { dx, dy, numberActiveTouches }) => {
        switch (numberActiveTouches) {
          case 1:
            pan.setValue({
              x: dx,
              y: dy,
            });
            recentDist.setValue(-1);
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

              const recentDistInteger =
                ConvertAnimatedValueToNumber(recentDist);
              if (recentDistInteger > 0) {
                const zoomInteger = ConvertAnimatedValueToNumber(zoom);
                zoom.setValue(
                  Math.min(
                    Math.max(
                      0.5,
                      zoomInteger + (dist - recentDistInteger) / 100
                    ),
                    15
                  )
                );
              }
              recentDist.setValue(dist);
            }
            break;
          default:
            recentDist.setValue(-1);
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
        transform: [
          { translateX: pan.x },
          { translateY: pan.y },
          { scale: zoom },
        ],
      }}
    >
      <Image
        source={{ uri: imageURI }}
        style={{
          ...styles.image,
          transform: [{ rotate: `${rotate}deg` }],
        }}
      />
    </Animated.View>
  ) : (
    <Text style={styles.emptyText}>Touch to load an image.</Text>
  );
}
