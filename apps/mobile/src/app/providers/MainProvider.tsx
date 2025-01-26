import { ModalPanel } from '@expense-tracker/services'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootNavigator } from '../navigators/RootNavigator'

export const MainProvider = () => {
  //check if the user is logged in
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RootNavigator/>
        <ModalPanel />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
