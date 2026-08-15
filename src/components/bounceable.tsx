import { type ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends Omit<PressableProps, 'style'> {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Scale applied while pressed. */
  pressScale?: number;
}

/**
 * Pressable that springs down on press — local replacement for
 * @freakycoder/react-native-bounceable, running on the UI thread.
 */
export function Bounceable({ children, style, pressScale = 0.94, ...pressableProps }: Props) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      {...pressableProps}
      style={[style, animatedStyle]}
      onPressIn={(event) => {
        scale.set(withSpring(pressScale, { damping: 15, stiffness: 400 }));
        pressableProps.onPressIn?.(event);
      }}
      onPressOut={(event) => {
        scale.set(withSpring(1, { damping: 15, stiffness: 400 }));
        pressableProps.onPressOut?.(event);
      }}
    >
      {children}
    </AnimatedPressable>
  );
}
