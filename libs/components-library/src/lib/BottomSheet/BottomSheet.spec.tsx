import { render } from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'

import { NavigationTestWrapper } from '../../test-utils'

import { BottomSheetComponent } from './BottomSheet'

describe('BottomSheet', () => {
  it('should render successfully', () => {
    const { root } = render(
      <NavigationTestWrapper>
        <BottomSheetComponent backgroundStyle={undefined}>
          <View style={{ flex: 1 }}/>
        </BottomSheetComponent>
      </NavigationTestWrapper>
    )

    expect(root).toBeTruthy()
  })
})
