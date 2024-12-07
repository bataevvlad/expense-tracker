import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/module/src/types'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import React, { memo, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolate,
  useSharedValue,
  useAnimatedReaction
} from 'react-native-reanimated'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'

import { CentralButton } from './tabBarComponents/CentralButton'
import { TabButton } from './tabBarComponents/TabButton'

export enum TabBarScreen {
  Main = 'Main',
  Central = 'Central',
  Settings = 'Settings',
}

export interface TabBarProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: any;
  insets: EdgeInsets;
  isVisible?: boolean;
}

const springConfig = {
  damping: 50,
  mass: 1,
  stiffness: 1000,
}

export const CustomTabBar = memo(({
  state,
  navigation,
  isVisible = true
}: TabBarProps) => {
  const { bottom: bottomInset } = useSafeAreaInsets()
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)

  useAnimatedReaction(
    () => isVisible,
    (visible) => {
      translateY.value = withSpring(
        visible ? 0 : 100,
        springConfig
      )
      scale.value = withSpring(
        visible ? 1 : 0.95,
        springConfig
      )
    },
    [isVisible]
  )

  const animatedStyle = useAnimatedStyle(
    () => {
      const opacity = interpolate(
        translateY.value,
        [0, 50, 100],
        [1, 0.8, 0],
        'clamp'
      )

      return {
        transform: [
          { translateY: translateY.value },
          { scale: scale.value }
        ],
        opacity
      }
    })

  const doCustomAction = useCallback((screenName: string): boolean => {
    if (screenName === TabBarScreen.Central) {
      navigation.navigate('AddExpenseScreen')
      return true
    }
    return false
  }, [navigation])

  const renderTabs = useMemo(() =>
    state.routes.map((route, index) => {
      const isFocused = state.index === index

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        })

        if (!doCustomAction(route.name)) {
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              merge: true
            })
          }
        }
      }

      if (route.name === TabBarScreen.Central) {
        return (
          <CentralButton
            key={route.name}
            onPress={onPress}
          />
        )
      }

      return (
        <TabButton
          key={route.name}
          route={route}
          isFocused={isFocused}
          onPress={onPress}
        />
      )
    }), [state.routes, state.index, navigation, doCustomAction])

  return (
    <Animated.View
      style={[
        styles.customTabBarContainer,
        {
          marginBottom: bottomInset * 0.3,
        },
        animatedStyle
      ]}
    >
      {renderTabs}
    </Animated.View>
  )
})

CustomTabBar.displayName = 'CustomTabBar'

const styles = StyleSheet.create({
  customTabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
})
