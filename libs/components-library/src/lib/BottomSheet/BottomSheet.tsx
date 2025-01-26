import { waitForKeyboardToClose, waitForNextFrame } from '@expense-tracker/shared-utils'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
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
  isKeyboardUsed?: boolean;
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
    isKeyboardUsed = false
  },
  forwardRef
) => {
  const onBottomSheetClose = async () => {
    if (isKeyboardUsed) {
      await waitForKeyboardToClose()
      await waitForNextFrame()
    }
  }

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        onPress={onBottomSheetClose}
        pressBehavior="close"
        enableTouchThrough
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={OVERLAY_OPACITY}
        style={styles.backDrop}
      />
    ),
    []
  )

  return (
    <BottomSheet
      keyboardBehavior="interactive"
      backdropComponent={renderBackdrop}
      backgroundStyle={backgroundStyle}
      style={style}
      detached={detached}
      ref={forwardRef}
      enablePanDownToClose={true}
      onChange={onChange}
      onClose={onClose}
      bottomInset={bottomInset}
    >
      <BottomSheetView
        style={{ flex: 1 }}
        enableFooterMarginAdjustment={true}
      >
        {children}
      </BottomSheetView>
    </BottomSheet>
  )
})

BottomSheetComponent.displayName = 'BottomSheetComponent'

const styles = StyleSheet.create({
  backDrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(56,49,46,0.71)',
  },
})
