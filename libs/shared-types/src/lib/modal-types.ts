import { ReactElement, RefObject } from 'react'
import { ViewStyle } from 'react-native'

export enum MODAL_KEYS {
  CALENDAR = 'CALENDAR',
}

export enum ModalAnimationType {
  SlideUp = 'slideUp',
  Fade = 'fade'
}

export interface ModalAnimationOptions {
  isOpenAnimationEnabled?: boolean;
  isCloseAnimationEnabled?: boolean;
  onCloseAnimationFinished?: () => void;
  animationType?: ModalAnimationType;
}

export interface ModalOptions {
  useModalLayer?: boolean;
  bottomInset?: number;
  useSafeArea?: boolean;
  desiredKey?: string;
  modalComponentParams?: Record<any, any>;
  returnAutoResult?: boolean;
  disableClosing?: boolean;
  animationOptions?: ModalAnimationOptions;
  $resolve?: (arg?: any) => void;
  $reject?: (arg?: any) => void;
}

export interface ModalItem {
  element: ReactElement;
  key: string;
  ref: RefObject<any>;
  options?: ModalOptions;
  isClosed?: boolean;
  backgroundStyle?: ViewStyle | undefined;
}

export interface ModalServiceBaseComponentProps {
  resolve: (arg0?: any) => void;
  reject: (arg0?: any) => void;
}

export enum ModalServiceResultStatus {
  None = 'None',
  ModalAlreadyOpened = 'ModalAlreadyOpened',
  NotInitialized = 'NotInitialized',
  Ready = 'Ready',
}

