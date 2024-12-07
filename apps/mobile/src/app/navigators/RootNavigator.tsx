import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Easing } from 'react-native'

import { ExpenseInputScreen } from '../screens/AddExpenseScreen'
import { CategoriesScreen } from '../screens/CategoriesScreen'

import { rootScreenOptions } from './commonOptions/common'
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
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
            cardOverlayEnabled: false,
            headerShadowVisible: false,
            cardStyle: { backgroundColor: 'transparent' },
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  damping: 20,     // Controls how quickly the animation stops (lower = more bounce)
                  stiffness: 90,   // Controls the spring force (higher = faster initial movement)
                  mass: 0.4,       // Controls the weight (lower = faster movement)
                  overshootClamping: false,  // Allows slight overshoot for natural feel
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
              close: {
                animation: 'timing',
                config: {
                  duration: 250,
                  easing: Easing.cubic,
                },
              },
            },
          }}
        >
          <RootStack.Screen
            name="AddExpenseScreen"
            component={ExpenseInputScreen}
          />
          <RootStack.Screen
            options={{
              animation: 'fade',
              presentation: 'transparentModal',
              cardStyle: {
                backgroundColor: 'rgba(108,108,108,0.34)'
              },
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
