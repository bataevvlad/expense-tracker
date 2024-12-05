import { render } from '@testing-library/react-native'
import React from 'react'

import { CategoriesItem } from './CategoriesItem'


describe('CategoriesItem', () => {
  it('should render successfully', () => {
    const { root } = render(
      <CategoriesItem
        category={{
          id: '1',
          name: 'Test',
        }}
        onSelectCategory={() => null}
      />)
    expect(root).toBeTruthy()
  })
})
