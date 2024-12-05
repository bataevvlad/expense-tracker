import React, { useState } from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native'

interface Category {
  id: string;
  name: string;
}

interface CategoriesItemProps {
  category: Category;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  onSelectCategory: (category: Category) => void;
}

export const CategoriesItem: React.FC<CategoriesItemProps> = ({
  category,
  onSelectCategory,
  containerStyles,
  textStyles,
}) => {
  const [pressed, setPressed] = useState(false)

  const handlePress = () => {
    setPressed(true)
    setTimeout(() => {
      onSelectCategory(category)
      setPressed(false)
    }, 300)
  }

  return (
    <TouchableOpacity
      style={[
        styles.item,
        containerStyles,
        pressed && styles.pressed, // Apply pressed styles conditionally
      ]}
      onPress={handlePress}
      activeOpacity={1} // Disable default opacity behavior
    >
      <Text style={[styles.text, textStyles]}>{category.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 15,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    borderColor: '#ccc',
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
  },
})
