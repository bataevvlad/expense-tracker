import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import type { SNAP_POINT_TYPE } from '@gorhom/bottom-sheet/lib/typescript/constants'
import React, { forwardRef, ReactNode, useCallback } from 'react'
import { type StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { AnimatedStyle } from 'react-native-reanimated'

const OVERLAY_OPACITY = 0.7

export interface BottomSheetProps {
  children: ReactNode;
  onChange?: (
    index: number,
    position: number,
    type: SNAP_POINT_TYPE
  ) => void;
  backgroundStyle: ViewStyle | undefined;
  onClose?: () => void;
  bottomInset?: number,
  style?: StyleProp<
    AnimatedStyle<
      Omit<
        ViewStyle,
        | 'flexDirection'
        | 'position'
        | 'top'
        | 'left'
        | 'bottom'
        | 'right'
        | 'opacity'
        | 'transform'
      >
    >
  >;
  detached?: boolean;
}

export const BottomSheetComponent = forwardRef<BottomSheet, BottomSheetProps>((
  {
    children,
    onChange,
    onClose,
    style,
    backgroundStyle,
    bottomInset,
    detached = false,
  },
  forwardRef
) => {

  const backDrop = useCallback((backdropProps: BottomSheetBackdropProps): JSX.Element => (
    <BottomSheetBackdrop
      { ...backdropProps }
      pressBehavior={'close'}
      enableTouchThrough={ true }
      disappearsOnIndex={-1}
      appearsOnIndex={1}
      opacity={OVERLAY_OPACITY}
      style={styles.backDrop}
    />
  ), [])

  return (
    <BottomSheet
      backdropComponent={backDrop}
      backgroundStyle={backgroundStyle}
      style={style}
      detached={detached}
      ref={forwardRef}
      enablePanDownToClose={true}
      onChange={onChange}
      onClose={onClose}
      bottomInset={bottomInset}
    >
      <BottomSheetScrollView enableFooterMarginAdjustment={true}>
        {children}
      </BottomSheetScrollView>
    </BottomSheet>
  )
})

BottomSheetComponent.displayName = 'BottomSheetComponent'

const styles = StyleSheet.create({
  backDrop: {
    backgroundColor: 'rgba(56,49,46,0.71)',
  },
})
