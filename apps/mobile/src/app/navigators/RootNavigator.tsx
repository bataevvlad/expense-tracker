import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import { ExpenseInputScreen } from '../screens/AddExpenseScreen'
import { CategoriesScreen } from '../screens/CategoriesScreen'

import { fullScreenModalGroupOptions, rootScreenOptions } from './commonOptions/common'
import { TabNavigator } from './tabNavigator'

const RootStack = createStackNavigator<any, 'Root'>()

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={rootScreenOptions}
        id={'Root'}
      >
        <RootStack.Group>
          <RootStack.Screen
            options={{ headerShown: false }}
            name={'Tabs'}
            component={TabNavigator}
          />
        </RootStack.Group>
        <RootStack.Group
          screenOptions={fullScreenModalGroupOptions}
        >
          <RootStack.Screen
            name="AddExpenseScreen"
            component={ExpenseInputScreen}
          />
          <RootStack.Screen
            options={{
              animation: 'fade',
              presentation: 'transparentModal',
              cardStyle: { backgroundColor: 'rgba(108,108,108,0.34)' },
              transitionSpec: {
                open: {
                  animation: 'timing',
                  config: {
                    duration: 220,
                  },
                },
                close: {
                  animation: 'timing',
                  config: {
                    duration: 210,
                  },
                },
              },
            }}
            name={'Categories'}
            component={CategoriesScreen}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
