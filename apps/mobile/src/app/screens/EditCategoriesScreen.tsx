import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ModalScreensHelper } from '../helpers/modal-helper'
import { ExpenseSwitcher } from '../tempComponents/ExpenseSwitcher'

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface CategoryListProps {
  onSelectCategory: (category: Category) => void;
}

const categories: Category[] = [
  { id: '1', name: 'Rent', icon: '🏠', color: '#0A84FF' },
  { id: '2', name: 'Groceries', icon: '🛒', color: '#FF9500' },
  { id: '3', name: 'Subscriptions', icon: '🔄', color: '#BF5AF2' },
  { id: '4', name: 'Food', icon: '🍔', color: '#FF375F' },
  { id: '5', name: 'Transport', icon: '🚂', color: '#5856D6' },
  { id: '6', name: 'Family', icon: '👨‍👩‍👧‍👦', color: '#FFB340' },
  { id: '7', name: 'Utilities', icon: '💡', color: '#FF2D55' },
  { id: '8', name: 'Fashion', icon: '👕', color: '#FFD60A' },
  { id: '9', name: 'Healthcare', icon: '🚑', color: '#FF3B30' },
  { id: '10', name: 'Pets', icon: '🐕', color: '#64D2FF' },
  { id: '11', name: 'Sneakers', icon: '👟', color: '#AF52DE' },
  { id: '12', name: 'Gifts', icon: '🎁', color: '#FF6482' },
]

export const EditCategoriesScreen: React.FC<CategoryListProps> = () => {
  return (
    <SafeAreaView
      style={styles.container}
      edges={['bottom']}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>

      <Text style={styles.sectionTitle}>EXPENSE CATEGORIES</Text>

      <BottomSheetScrollView style={styles.scrollView}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryRow}
            onPress={() => {
              // onSelectCategory(category)
              ModalScreensHelper.openEditCategoryItem()
            }}
          >
            <View style={styles.categoryContent}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <View style={[styles.colorIndicator, { backgroundColor: category.color }]} />
          </TouchableOpacity>
        ))}
      </BottomSheetScrollView>

      <View style={styles.footer}>

        <ExpenseSwitcher
          containerStyle={{
            justifyContent: 'center',
          }}
          switcherContainerStyle={{
            borderWidth: 0.4,
            alignSelf: 'flex-start',
            width: '70%',
            height: 32,
            borderRadius: 20,
          }}
        />
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  scrollView: {
    flex: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 17,
    color: '#000000',
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  footerButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  footerButtonInactive: {
    opacity: 0.5,
  },
  footerButtonText: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '500',
  },
  footerButtonTextInactive: {
    color: '#8E8E93',
  },
})
