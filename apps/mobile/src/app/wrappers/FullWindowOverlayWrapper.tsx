import React from 'react'
import { Platform } from 'react-native'
import { FullWindowOverlay } from 'react-native-screens'

const isIos = Platform.OS === 'ios'

interface FullWindowOverlayWrapperProps {
  children: React.ReactNode
}

export const FullWindowOverlayWrapper = (
  { children }: FullWindowOverlayWrapperProps
) =>
  isIos ? <FullWindowOverlay>{children}</FullWindowOverlay> : children
