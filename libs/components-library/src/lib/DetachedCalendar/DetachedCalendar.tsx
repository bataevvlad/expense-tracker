import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useCallback, useState, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type DateTimePickerEvent = Parameters<NonNullable<React.ComponentProps<typeof DateTimePicker>['onChange']>>[0];
type DateChangeHandler = (event: DateTimePickerEvent, date?: Date) => void;

const PICKER_CONFIG = {
  accentColor: 'black',
  themeVariant: 'light' as const,
  display: 'inline' as const,
} as const

export const DetachedCalendar: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date())

  const handleDateChange: DateChangeHandler = useCallback((event, selectedDate) => {
    if (selectedDate) {
      setDate(prevDate => {
        const newDate = new Date(selectedDate)
        newDate.setHours(prevDate.getHours(), prevDate.getMinutes())
        return newDate
      })
    }
  }, [])

  const handleTimeChange: DateChangeHandler = useCallback((event, selectedDate) => {
    if (selectedDate) {
      setDate(prevDate => {
        const newDate = new Date(prevDate)
        newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes())
        return newDate
      })
    }
  }, [])

  const datePicker = useMemo(() => (
    <DateTimePicker
      {...PICKER_CONFIG}
      mode="date"
      onChange={handleDateChange}
      value={date}
    />
  ), [date, handleDateChange])

  const timePicker = useMemo(() => (
    <DateTimePicker
      {...PICKER_CONFIG}
      mode="time"
      onChange={handleTimeChange}
      value={date}
    />
  ), [date, handleTimeChange])

  return (
    <View style={styles.container}>
      {datePicker}
      <View style={styles.timeContainer}>
        <Text style={styles.timeLabel}>Time</Text>
        {timePicker}
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
