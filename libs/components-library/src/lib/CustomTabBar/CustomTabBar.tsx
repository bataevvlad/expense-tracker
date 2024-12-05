import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs/lib/typescript/module/src/types'
import { PlatformPressable } from '@react-navigation/elements'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { IconCashBanknoteFilled, IconSettingsFilled } from '@tabler/icons-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { EdgeInsets } from 'react-native-safe-area-context'

import { BounceButton } from '../BounceButton/BounceButton'

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
}

export const CustomTabBar = (
  {
    state,
    navigation
  }: TabBarProps) => {
  return (
    <View style={styles.customTabBarContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index

        const doCustomAction = (screenName: string): boolean => {
          switch (screenName) {
            case TabBarScreen.Central:
              navigation.navigate('AddExpenseScreen')
              return true
          }
          return false
        }

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
            <PlatformPressable
              key={route.name}
              onPress={onPress}
              style={styles.centralButtonContainer}
            >
              <View style={styles.centralButton}>
                <Text style={styles.centralButtonText}>+</Text>
              </View>
            </PlatformPressable>
          )
        } else {
          return (
            <BounceButton
              key={route.name}
              onPress={onPress}
              isFocused={isFocused}
              style={styles.tabButton}
            >
              {route.name === TabBarScreen.Main ? (
                <IconCashBanknoteFilled
                  size={35}
                  color="#333"
                  fill="#333"
                  opacity={isFocused ? 1 : 0.5}
                />
              ) : (
                <IconSettingsFilled
                  size={35}
                  color="#333"
                  fill="#333"
                  opacity={isFocused ? 1 : 0.5}
                />
              )}
            </BounceButton>
          )
        }
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  customTabBarContainer: {
    flexDirection: 'row',
    height: 55,
    marginTop: 11,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButton: {
    flex: 1,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  centralButton: {
    width: 60,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centralButtonText: {
    paddingBottom: 2,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
})
