import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type DateTimePickerEvent = Parameters<NonNullable<React.ComponentProps<typeof DateTimePicker>['onChange']>>[0];
type DateChangeHandler = (event: DateTimePickerEvent, date?: Date) => void;

const PICKER_CONFIG = {
  accentColor: 'black',
  themeVariant: 'light' as const,
  display: 'inline' as const,
}

export const DetachedCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date())

  const handleDateChange: DateChangeHandler = useCallback((event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }, [])

  return (
    <View style={styles.container}>
      <DateTimePicker
        {...PICKER_CONFIG}
        mode="date"
        onChange={handleDateChange}
        value={date}
      />

      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Time</Text>
        <DateTimePicker
          {...PICKER_CONFIG}
          mode="time"
          onChange={handleDateChange}
          value={date}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1,
  },
  timeContainer: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
    flexDirection: 'row',
  },
  timeLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 5,
    textAlign: 'center',
    alignSelf: 'center',
  },
})
