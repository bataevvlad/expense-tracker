declare module '@gorhom/bottom-sheet' {
  import { FC } from 'react';

  const BottomSheet: FC<{ children?: React.ReactNode }>;
  const BottomSheetBackdrop: FC;
  const BottomSheetScrollView: FC;
  const BottomSheetFlatList: FC;
  const BottomSheetSectionList: FC;

  export default BottomSheet;
  export {
    BottomSheetBackdrop,
    BottomSheetScrollView,
    BottomSheetFlatList,
    BottomSheetSectionList,
  };
}
