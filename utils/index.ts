import { Animated } from 'react-native';

/**
 * @description
 * Converts Animated.Value to a number.
 * @param value Animated.Value
 * @returns A stringified and then parsed number of parameter `value`.
 */
export function ConvertAnimatedValueToNumber(value: Animated.Value) {
  return Number(JSON.stringify(value));
}
