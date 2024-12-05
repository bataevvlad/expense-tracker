import { MultipleSwitcher } from '@expense-tracker/components-library'
import { IconX, IconBackspace, IconCheck } from '@tabler/icons-react-native'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ModalScreensHelper } from '../helpers/modal-helper'

const getSwitchItemsRegister = [
  { label: 'Expense', value: 'Expense' },
  { label: 'Income', value: 'Income' },
]

export const ExpenseInputScreen: React.FC = ({ navigation, route, isEmbedded = false }: any) => {
  const [amount, setAmount] = useState<string>('0')
  const [expenseIncome, setExpenseIncome] = useState<string | null>('Expense')
  const buttonRef = useRef<TouchableOpacity>(null)

  const [keypadLayouts, setKeypadLayouts] = useState({})
  const handleKeypadLayout = (num) => (event) => {
    const { x, y, width, height } = event.nativeEvent.layout
    setKeypadLayouts((prevLayouts) => ({
      ...prevLayouts,
      [num]: { x, y, width, height },
    }))
  }
  useEffect(() => {
    if (isEmbedded) navigation.goBack()
  }, [isEmbedded, navigation])

  const handleNumberPress = (num: string) => {
    if (num === 'finish') {
      // finish
    } else {
      setAmount((prev) => (prev.length < 7 ? (prev === '0' ? num : prev + num) : prev))
    }
  }

  const handleDelete = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'))
  }

  const handleClose = () => {
    navigation.goBack()
  }

  // const handleFinish = () => {
  //   // Handle finish action here
  // };

  const openCategoriesModal = () => {
    if (buttonRef.current) {
      buttonRef.current.measureInWindow((x, y, width, height) => {
        navigation.navigate('Categories', {
          buttonPosition: { x, y, width, height },
          keypadLayouts,
        })
      })
    }
  }

  const onCalendarPress = () => {
    ModalScreensHelper.onCalendarPress()
  }

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={{ position: 'absolute', zIndex: 1, backgroundColor: '#efefef', borderRadius: 20, }}
          onPress={handleClose}
        >
          <IconX
            size={20}
            color={'#636363'}
            style={{ margin: 7 }}
          />
        </TouchableOpacity>
        {getSwitchItemsRegister && getSwitchItemsRegister.length > 1 && (
          <View style={styles.switcherContainer}>
            <MultipleSwitcher
              activeTextStyle={styles.activeTextStyle}
              items={getSwitchItemsRegister}
              value={expenseIncome}
              onChange={setExpenseIncome}
            />
          </View>
        )}
      </View>

      <View>
        <View style={styles.amountContainer}>
          <View style={styles.amountInnerContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1,  }}>
              <Text style={styles.currencySymbol}>💰</Text>
              <Text style={styles.amountText}>{amount}</Text>
            </View>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.clearButton}
            >
              <IconBackspace
                size={35}
                color={'#636363'}
                style={{ margin: 3, right: 2, }}
              />
            </TouchableOpacity>
          </View>

        </View>
        <TextInput
          style={styles.noteInput}
          placeholder="Add Note"
          placeholderTextColor="#bbb"
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.metaContainer}>
          <TouchableOpacity
            onPress={onCalendarPress}
            style={styles.metaButton}
          >
            <Text>📅 Today, 12 Nov</Text>
          </TouchableOpacity>
          <TouchableOpacity
            ref={buttonRef}
            onPress={openCategoriesModal}
            style={styles.metaButton}
          >
            <Text>📂 Category</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.keypadContainer}>
          <View
            style={styles.keypad}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'finish'].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.keyButton}
                onLayout={handleKeypadLayout(num)}
                onPress={() => handleNumberPress(num)}
              >
                {num === 'finish' ? (
                  <IconCheck
                    style={{ position: 'absolute', top: 10 }}
                    size={35}
                    color="#636363"
                  />
                ) : (
                  <Text style={styles.keyText}>{num}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switcherContainer: {
    flex: 1,
    alignItems: 'center',
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  activeButton: {
    backgroundColor: '#000',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#000',
  },
  activeTextStyle: {
    color: '#000000',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  amountInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  currencySymbol: {
    fontSize: 24,
    marginRight: 5,
  },
  amountText: {
    marginLeft: 5,
    fontSize: 48,
    fontWeight: 'bold',
  },
  clearButton: {
    position: 'absolute',
    right: 0,
    marginLeft: 5,
    backgroundColor: '#efefef',
    borderRadius: 20,
  },
  clearButtonText: {
    fontSize: 20,
  },
  noteInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 10,
    width: '30%',
    fontSize: 16,
    color: '#333',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 15,
  },
  bottomContainer: {
    paddingBottom: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metaButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  keypadContainer: {
    alignSelf: 'stretch',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  keyButton: {
    width: '30%',
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    color: '#333',
  },
})

