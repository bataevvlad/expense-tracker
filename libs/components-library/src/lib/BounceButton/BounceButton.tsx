import { PlatformPressable } from '@react-navigation/elements'
import React, { useRef } from 'react'
import { Animated, ViewStyle } from 'react-native'

interface BounceButtonProps {
  children: React.ReactNode,
  onPress: () => void,
  isFocused: boolean,
  style: ViewStyle,
}

export const BounceButton = (
  {
    children,
    onPress,
    isFocused,
    style,
  }: BounceButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.85,
      tension: 75,
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      tension: 75,
      useNativeDriver: true,
    }).start()
    onPress?.()
  }

  return (
    <PlatformPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        {children}
      </Animated.View>
    </PlatformPressable>
  )
}
