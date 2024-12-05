const BottomSheet = jest.fn(({ children }) => {
  return children
})

const BottomSheetBackdrop = jest.fn(() => null)
const BottomSheetScrollView = jest.fn(() => null)
const BottomSheetFlatList = jest.fn(() => null)
const BottomSheetSectionList = jest.fn(() => null)

export default BottomSheet

export {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetFlatList,
  BottomSheetSectionList,
}
