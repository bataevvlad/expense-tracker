import { render } from '@testing-library/react-native'
import React from 'react'

import { MultipleSwitcher } from './MultipleSwitcher'

describe('MultipleSwitcher', () => {
  it('should render successfully', () => {
    const { root } = render(
      <MultipleSwitcher
        items={[]}
        value={undefined}
        onChange={() => {}}
      />)
    expect(root).toBeTruthy()
  })
})
