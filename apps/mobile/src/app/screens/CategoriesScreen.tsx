import { CategoriesItem, CategoriesList } from '@expense-tracker/components-library'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native'

import { ModalScreensHelper } from '../helpers/modal-helper'

interface ButtonPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

type RootStackParamList = {
  Categories: {
    buttonPosition: ButtonPosition;
    keypadLayouts: any;
  };
};

type CategoriesScreenProps = StackScreenProps<RootStackParamList, 'Categories'>;
const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

export const CategoriesScreen: React.FC<CategoriesScreenProps> = ({ route, navigation }) => {
  const { buttonPosition } = route.params

  const listWidth = 140
  const listHeight = 220

  let top = buttonPosition.y - listHeight - 5

  if (top < 0) {
    top = buttonPosition.y + buttonPosition.height
  }

  if (top + listHeight > screenHeight) {
    top = screenHeight - listHeight
  }

  let left = buttonPosition.x + buttonPosition.width / 2 - listWidth / 2 + 11
  if (left < 10) {
    left = 10
  } else if (left + listWidth > screenWidth) {
    left = screenWidth - listWidth
  }

  const handleSelectCategory = (
    // category: { id: string; name: string }
  ) => {
    navigation.goBack()
  }

  const handleOutsidePress = () => {
    navigation.goBack()
  }

  const onEditPress = () => {

    Promise.all([
      ModalScreensHelper.openEditCategories(),
      navigation.goBack()
    ])
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.touchableArea} />
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.categoryListContainer,
          {
            top,
            left,
            width: listWidth,
            height: listHeight,
          },
        ]}
      >
        <CategoriesItem
          category={{
            id: '1',
            name: 'Edit'
          }}
          containerStyles={{
            backgroundColor: '#afadad',
            opacity: 1,
          }}
          onSelectCategory={onEditPress}
        />
        <CategoriesList onSelectCategory={handleSelectCategory} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableArea: {
    flex: 1,
  },
  categoryListContainer: {
    position: 'absolute',
    borderRadius: 8,
    elevation: 5,
  },
})
