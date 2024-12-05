import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { render } from '@testing-library/react-native'
import React from 'react'
import { View } from 'react-native'

import { NavigationTestWrapper } from '../../test-utils'

import { CustomTabBar, TabBarScreen } from './CustomTabBar'

const Tab = createBottomTabNavigator<any, 'Tab'>()

const DummyComponent = () => <View />

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      id={'Tab'}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name={TabBarScreen.Main}
        component={DummyComponent}
      />
    </Tab.Navigator>
  )
}


describe('CustomTabBar', () => {
  it('should render successfully', () => {
    const { root } = render(
      <NavigationTestWrapper>
        <TabNavigator/>
      </NavigationTestWrapper>
    )
    expect(root).toBeTruthy()
  })
})
