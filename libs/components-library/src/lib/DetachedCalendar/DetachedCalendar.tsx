import { Calendar, toDateId } from '@marceloterreiro/flash-calendar'
import React, { useState } from 'react'

const today = toDateId(new Date())

export const DetachedCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(today)

  return (
    <Calendar
      calendarActiveDateRanges={[
        {
          startId: selectedDate,
          endId: selectedDate,
        },
      ]}
      calendarMonthId={today}
      onCalendarDayPress={setSelectedDate}
    />
  )
}
