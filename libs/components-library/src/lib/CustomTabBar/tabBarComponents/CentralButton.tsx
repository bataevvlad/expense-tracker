import { PlatformPressable } from '@react-navigation/elements'
import React, { memo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const CentralButton = memo(({ onPress }: { onPress: () => void }) => (
  <PlatformPressable
    onPress={onPress}
    style={styles.centralButtonContainer}
  >
    <View style={styles.centralButton}>
      <Text style={styles.centralButtonText}>+</Text>
    </View>
  </PlatformPressable>
))

CentralButton.displayName = 'CentralButton'

const styles = StyleSheet.create({
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
    paddingBottom: 46,
    fontSize: 35,
    color: '#fff',
    fontWeight: 'bold',
  },
})
