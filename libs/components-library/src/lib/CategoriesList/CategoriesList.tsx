import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { CategoriesItem } from '../CategoriesItem/CategoriesItem'

interface Category {
  id: string;
  name: string;
}

interface CategoryListProps {
  onSelectCategory: (category: Category) => void;
}

const categories: Category[] = [
  { id: '1', name: '🎄Technology' },
  { id: '2', name: '🎄Art' },
  { id: '3', name: '🎄Science' },
  { id: '4', name: '🎄Music' },
  { id: '5', name: '🎄Travel' },
]

export const CategoriesList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoriesItem
            category={item}
            onSelectCategory={onSelectCategory}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    borderRadius: 8,
  },
})
