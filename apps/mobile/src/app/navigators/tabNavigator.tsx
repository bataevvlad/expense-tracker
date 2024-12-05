import { CustomTabBar, TabBarScreen } from '@expense-tracker/components-library'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Tab = createBottomTabNavigator()

const MainScreen = () => (
  <View style={styles.centered}>
    <Text>Screen 2</Text>
  </View>
)

const SettingsScreen = () => (
  <View style={styles.centered}>
    <Text>Screen 3</Text>
  </View>
)

const DummyComponent = () => <View />

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      id={undefined}
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false
      }}
    >
      <Tab.Screen
        name={TabBarScreen.Main}
        component={MainScreen}
      />
      <Tab.Screen
        name={TabBarScreen.Central}
        component={DummyComponent}
      />
      <Tab.Screen
        name={TabBarScreen.Settings}
        component={SettingsScreen}
      />
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
