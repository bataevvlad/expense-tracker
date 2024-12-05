import { render } from '@testing-library/react-native'
import React from 'react'

import { CategoriesList } from './CategoriesList'

describe('CategoriesList', () => {
  it('should render successfully', () => {
    const { root } = render(<CategoriesList onSelectCategory={() => {}} />)
    expect(root).toBeTruthy()
  })
})
