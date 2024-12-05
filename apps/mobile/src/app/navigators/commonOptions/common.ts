export const rootScreenOptions = { cardStyle: { backgroundColor: '#FFF', paddingBottom: 11, } }

export const fullScreenModalGroupOptions: any = {
  headerShown: false,
  presentation: 'transparentModal',
  cardStyle: { backgroundColor: '#FFF' },
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 400,
      },
    },
  },
}
