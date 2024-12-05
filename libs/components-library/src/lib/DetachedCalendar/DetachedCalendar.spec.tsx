import { render } from '@testing-library/react-native'
import React from 'react'

import { DetachedCalendar } from './DetachedCalendar'

describe('DetachedCalendar', () => {
  it('should render successfully', () => {
    const { root } = render(<DetachedCalendar />)
    expect(root).toBeTruthy()
  })
})
