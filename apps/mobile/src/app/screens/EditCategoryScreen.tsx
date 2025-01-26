import { waitForKeyboardToClose, waitForNextFrame } from '@expense-tracker/services'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface CategoryEditProps {
  category?: {
    icon: string;
    name: string;
    color: string;
  };
  onClosePress: () => void;
  onSave: (category: { icon: string; name: string; color: string }) => void;
  onDelete?: () => void;
  resolve: (arg0: any) => void
}

export const CategoryEdit: React.FC<CategoryEditProps> = ({
  category,
  // onClosePress,
  // onSave,
  onDelete,
  resolve,
}) => {
  const [icon] = useState(category?.icon || '😊')
  const [name, setName] = useState(category?.name || '')
  const [color] = useState(category?.color || '#FF3B30')

  const inputRef = useRef(null)

  useEffect(() => {
    // Wait for 1 second before focusing
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }, [])


  const onClose = useCallback(
    async () => {
      await waitForKeyboardToClose()
      await waitForNextFrame()
      resolve?.(true)
    },
    [resolve]
  )

  return (
    <SafeAreaView
      edges={['bottom']}
      style={styles.safeArea}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onClose}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Expense</Text>
        {onDelete && (
          <TouchableOpacity
            onPress={onDelete}
            style={styles.headerButton}
          >
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Icon Preview */}
      <View style={styles.iconContainer}>
        <View style={styles.iconPreview}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
      </View>

      {/* Category Input Row */}
      <View style={styles.inputRow}>
        <View style={[styles.colorIndicator, { backgroundColor: color }]} />
        <BottomSheetTextInput
          style={styles.textInput}
          value={name}
          onChangeText={setName}
          placeholder="Category name"
          placeholderTextColor="#999"

          // autoFocus={true}
          ref={inputRef}
        />

        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkButtonText}>✓</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Indicator */}
      <View style={styles.bottomIndicator} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerButton: {
    padding: 8,
    minWidth: 44,
  },
  headerButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  deleteIcon: {
    fontSize: 20,
    textAlign: 'right',
  },
  iconContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  iconPreview: {
    width: 64,
    height: 64,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  iconText: {
    fontSize: 32,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
  },
  colorIndicator: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
  },
  checkButton: {
    width: 44,
    height: 44,
    backgroundColor: '#414146',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800'
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 8,
    opacity: 0.3,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    height: 44,
    backgroundColor: '#efefef',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
})
