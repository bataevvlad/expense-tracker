import { DetachedCalendar } from '@expense-tracker/components-library'
import { ModalService, ModalServiceAsyncResult } from '@expense-tracker/services'
import { MODAL_KEYS, ModalAnimationType } from '@expense-tracker/shared-types'
import { Button, StyleSheet, Text, View } from 'react-native'

import { EditCategoriesScreen } from '../screens/EditCategoriesScreen'
import { CategoryEdit } from '../screens/EditCategoryScreen'

export class ModalScreensHelper {
  public static onCalendarPress(bottomInset: number): Promise<void | ModalServiceAsyncResult>{
    return ModalService.showComponentAsync(DetachedCalendar,
      {
        useSafeArea: true,
        modalComponentParams: {
          bottomInset,
          style: styles.calendarStyle,
          detached: true,
        },
        desiredKey: MODAL_KEYS.CALENDAR,
      },
    )
  }

  public static openEditCategories(): Promise<void | ModalServiceAsyncResult>{
    return ModalService.showComponentAsync(EditCategoriesScreen,
      {
        useSafeArea: true,
        desiredKey: MODAL_KEYS.EDIT_CATEGORIES,
      },
    )
  }

  public static openEditCategoryItem(): Promise<void | ModalServiceAsyncResult>{
    return ModalService.showComponentAsync(CategoryEdit,
      {
        useSafeArea: true,
        desiredKey: MODAL_KEYS.EDIT_CATEGORY,
        modalComponentParams: {
          isKeyboardUsed: true,
        },
      },
    )
  }

  public static dialog(
  ): Promise<ModalServiceAsyncResult>{
    return ModalService.showComponentAsync(Dialog,
      {
        useModalLayer: true,
        animationOptions: {
          isOpenAnimationEnabled: true,
          isCloseAnimationEnabled: true,
          animationType: ModalAnimationType.Fade
        },
        desiredKey: 'FDFDF',
      },
    )
  }
}

const Dialog = ({ resolve }) => {
  return (
    <View style={{ marginTop: 200, backgroundColor: 'red', height: 200, width: 200 }}>
      <Text>Test</Text>

      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
      <Text>Test</Text>
      <Button
        title={'dimiss'}
        onPress={() => {
          resolve(true)
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  calendarStyle: {
    flex: 1,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  }
})
