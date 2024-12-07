import React, { memo } from 'react'
import { StyleSheet } from 'react-native'

import { BounceButton } from '../../BounceButton/BounceButton'
import { TabBarScreen } from '../CustomTabBar'

import { MainIcon } from './MainIcon'
import { SettingsIcon } from './SettingIcon'

export const TabButton = memo(({
  route,
  isFocused,
  onPress
}: {
  route: { name: string },
  isFocused: boolean,
  onPress: () => void
}) => (
  <BounceButton
    onPress={onPress}
    isFocused={isFocused}
    style={styles.tabButton}
  >
    {route.name === TabBarScreen.Main ? (
      <MainIcon isFocused={isFocused} />
    ) : (
      <SettingsIcon isFocused={isFocused} />
    )}
  </BounceButton>
))

TabButton.displayName = 'TabButton'

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
