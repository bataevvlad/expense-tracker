import { ModalPanel } from '@expense-tracker/services'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { RootNavigator } from '../navigators/RootNavigator'
import { FullWindowOverlayWrapper } from '../wrappers/FullWindowOverlayWrapper'

export const MainProvider = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <RootNavigator/>
        <FullWindowOverlayWrapper>
          <ModalPanel />
        </FullWindowOverlayWrapper>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
