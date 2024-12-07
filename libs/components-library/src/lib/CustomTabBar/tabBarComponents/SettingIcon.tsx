import { IconSettingsFilled } from '@tabler/icons-react-native'
import React, { memo } from 'react'

export const SettingsIcon = memo(({ isFocused }: { isFocused: boolean }) => (
  <IconSettingsFilled
    size={35}
    color="#333"
    fill="#333"
    opacity={isFocused ? 1 : 0.5}
  />
))

SettingsIcon.displayName = 'SettingsIcon'
