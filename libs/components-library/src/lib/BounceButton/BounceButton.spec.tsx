import { render } from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'

import { NavigationTestWrapper } from '../../test-utils'

import { BounceButton } from './BounceButton'


describe('BounceButton', () => {
  it('should render successfully', () => {
    const { root } = render(
      <NavigationTestWrapper>
        <BounceButton
          onPress={() => console.log('onPress')}
          isFocused={false}
          style={{ backgroundColor: 'red' }}
        >
          <View/>
        </BounceButton>
      </NavigationTestWrapper>
    )
    expect(root).toBeTruthy()
  })
})
