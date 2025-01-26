import { MultipleSwitcher } from '@expense-tracker/components-library'
import React, { Fragment, useState } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

const getSwitchItemsRegister = [
  { label: 'Expense', value: 'Expense' },
  { label: 'Income', value: 'Income' },
]

interface ExpenseSwitcherProps {
  containerStyle?: ViewStyle
  switcherContainerStyle?: ViewStyle
}

export const ExpenseSwitcher: React.FC<ExpenseSwitcherProps> = ({
  containerStyle,
  switcherContainerStyle,
}: ExpenseSwitcherProps) => {
  const [expenseIncome, setExpenseIncome] = useState<string | null>('Expense')

  return (
    <Fragment>
      {getSwitchItemsRegister && getSwitchItemsRegister.length > 1 && (
        <View style={[styles.switcherContainer, containerStyle]}>
          <MultipleSwitcher
            containerStyle={switcherContainerStyle}
            activeTextStyle={styles.activeTextStyle}
            items={getSwitchItemsRegister}
            value={expenseIncome}
            onChange={setExpenseIncome}
          />
        </View>
      )}
    </Fragment>
  )
}

const styles = StyleSheet.create({
  switcherContainer: {
    flex: 1,
    alignItems: 'center',
  },
  activeTextStyle: {
    color: '#000000',
  }
})

