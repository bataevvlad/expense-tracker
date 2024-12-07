import { IconCashBanknoteFilled } from '@tabler/icons-react-native'
import React, { memo } from 'react'

export const MainIcon = memo(
  ({ isFocused }: { isFocused: boolean }) => (
    <IconCashBanknoteFilled
      size={35}
      color="#333"
      fill="#333"
      opacity={isFocused ? 1 : 0.5}
    />
  ))

MainIcon.displayName = 'MainIcon'
