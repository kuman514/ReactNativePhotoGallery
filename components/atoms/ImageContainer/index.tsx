import { useEffect, useRef } from 'react';
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
        pan.setValue({
          x: dx,
          y: dy,
        });

        const recentDistToSet =
          numberActiveTouches === 2
            ? (() => {
                const firstPageX = event.nativeEvent.touches[0].pageX;
                const firstPageY = event.nativeEvent.touches[0].pageY;
                const secondPageX = event.nativeEvent.touches[1].pageX;
                const secondPageY = event.nativeEvent.touches[1].pageY;

                const left = Math.min(firstPageX, secondPageX);
                const right = Math.max(firstPageX, secondPageX);
                const top = Math.min(firstPageY, secondPageY);
                const bottom = Math.max(firstPageY, secondPageY);

                const horizontalDist = right - left;
                const verticalDist = bottom - top;

                const dist = Math.sqrt(
                  horizontalDist * horizontalDist + verticalDist * verticalDist
                );

                const recentDistParsed =
                  ConvertAnimatedValueToNumber(recentDist);
                if (recentDistParsed > 0) {
                  const zoomParsed = ConvertAnimatedValueToNumber(zoom);
                  zoom.setValue(
                    Math.min(
                      Math.max(
                        0.5,
                        zoomParsed + (dist - recentDistParsed) / 100
                      ),
                      15
                    )
                  );
                }
                return dist;
              })()
            : -1;
        recentDist.setValue(recentDistToSet);
      },
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  /**
   * This is to reset all values on change of image URI
   */
  useEffect(() => {
    pan.flattenOffset();
    pan.setValue({
      x: 0,
      y: 0,
    });
    zoom.setValue(1);
  }, [imageURI]);

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
