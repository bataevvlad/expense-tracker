import { PlatformPressable } from '@react-navigation/elements'
import React from 'react'
import { ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

interface BounceButtonProps {
  children: React.ReactNode
  onPress: () => void
  isFocused: boolean
  style: ViewStyle
}

export const BounceButton = ({
  children,
  onPress,
  isFocused,
  style,
}: BounceButtonProps) => {
  const scale = useSharedValue(1)

  const handlePressIn = () => {
    scale.value = withSpring(0.85, {
      damping: 8,
      mass: 0.5,
    })
  }

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 8,
      mass: 0.5,
    })
    onPress?.()
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }]
    }
  })

  return (
    <PlatformPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </PlatformPressable>
  )
}
