import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const NavigationTestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>{children}</NavigationContainer>
    </GestureHandlerRootView>
  )
}
