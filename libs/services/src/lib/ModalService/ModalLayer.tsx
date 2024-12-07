import { ModalAnimationOptions, ModalAnimationType } from '@expense-tracker/shared-types'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useMemo, useCallback } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing, AnimationCallback,
} from 'react-native-reanimated'

const { height } = Dimensions.get('window')

const DEFAULT_ANIMATION_CONFIG = {
  duration: 400,
  easing: Easing.out(Easing.cubic),
} as const

interface IProps {
  children: React.ReactElement<any>;
  animationOptions?: ModalAnimationOptions;
  backgroundRef?: React.ReactElement<any>;
}

export interface ModalLayerRef {
  animateClosing: () => Promise<boolean>;
}

export const ModalLayer = forwardRef<ModalLayerRef, IProps>((props, ref) => {
  const { children, backgroundRef, animationOptions } = props

  const translateY = useSharedValue(0)
  const opacity = useSharedValue(1)

  const closingResolverRef = useRef<((value: boolean) => void) | null>(null)

  const animateAppearance = useCallback(() => {
    if (!animationOptions?.isOpenAnimationEnabled) {
      return
    }

    if (animationOptions?.animationType === ModalAnimationType.Fade) {
      opacity.value = 0
      opacity.value = withTiming(1, DEFAULT_ANIMATION_CONFIG)
    } else {
      translateY.value = height
      translateY.value = withTiming(0, DEFAULT_ANIMATION_CONFIG)
    }
  }, [animationOptions?.isOpenAnimationEnabled, animationOptions?.animationType, opacity, translateY])

  const animateClosing = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      closingResolverRef.current = resolve

      const finishCallback: AnimationCallback = (finished?: boolean) => {
        if (closingResolverRef.current) {
          runOnJS(closingResolverRef.current)(!!finished)
        }
      }

      if (animationOptions?.animationType === ModalAnimationType.Fade) {
        opacity.value = withTiming(0, DEFAULT_ANIMATION_CONFIG, finishCallback)
      } else {
        translateY.value = withTiming(height, DEFAULT_ANIMATION_CONFIG, finishCallback)
      }
    })
  }, [animationOptions?.animationType, opacity, translateY])

  useImperativeHandle(ref, () => ({
    animateClosing
  }), [animateClosing])

  useEffect(() => {
    animateAppearance()
  }, [animateAppearance])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value
  }), [])

  const memoizedChild = useMemo(() => (
    React.cloneElement(children, { backgroundRef })
  ), [children, backgroundRef])

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, animatedStyle]}
      pointerEvents='box-none'
    >
      {memoizedChild}
    </Animated.View>
  )
})

ModalLayer.displayName = 'ModalLayer'
