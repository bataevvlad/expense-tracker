import { DetachedCalendar } from '@expense-tracker/components-library'
import { ModalService, ModalServiceAsyncResult } from '@expense-tracker/services'
import { MODAL_KEYS } from '@expense-tracker/shared-types'
import { StyleSheet } from 'react-native'

export class ModalScreensHelper {
  public static onCalendarPress(): Promise<void | ModalServiceAsyncResult>{
    return ModalService.showComponentAsync(DetachedCalendar,
      {
        useSafeArea: true,
        modalComponentParams: {
          bottomInset: 46,
          style: styles.calendarStyle,
          detached: true,
        },
        desiredKey: MODAL_KEYS.CALENDAR,
      },
    )
  }
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
