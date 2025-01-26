import { Keyboard, Platform } from 'react-native'

const isIOS = Platform.OS === 'ios'

export const waitForKeyboardToClose = (shouldResolveImmediately = true) => {
  return new Promise<void>((resolve) => {
    // If the flag is true and the platform is iOS, resolve immediately
    if (isIOS && shouldResolveImmediately) {
      Keyboard.dismiss()
      return resolve()
    }

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      keyboardHideListener.remove()
      resolve()
    })

    Keyboard.dismiss()

    // Fallback in case the keyboard was already closed
    setTimeout(() => {
      keyboardHideListener.remove()
      resolve()
    }, 0)
  })
}

export const waitForNextFrame = (callback?: () => void): Promise<void> => {
  return new Promise<void>((resolve) => {
    if (callback) {
      callback()
    }
    requestAnimationFrame(() => {
      resolve()
    })
  })
}
