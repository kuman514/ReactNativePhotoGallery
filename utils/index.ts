import { Animated } from 'react-native';

/**
 * @description
 * I don't understand why Animated.Value from React Native does not provide its value,
 * while Animated.ValueXY does by its members x and y.
 * Anyway, this function converts Animated.Value to a number.
 * @param value Animated.Value
 * @returns A stringified and then parsed number of parameter `value`.
 */
export function ConvertAnimatedValueToNumber(value: Animated.Value) {
  return Number(JSON.stringify(value));
}
