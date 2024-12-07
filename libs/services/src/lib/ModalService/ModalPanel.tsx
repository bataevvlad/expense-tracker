import { BottomSheetComponent } from '@expense-tracker/components-library'
import { ModalItem, ModalOptions } from '@expense-tracker/shared-types'
import * as React from 'react'
import { createRef, ReactElement } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FullWindowOverlay } from 'react-native-screens'

import { ModalLayer } from './ModalLayer'
import { ModalService } from './ModalService'

const isIos = Platform.OS === 'ios'

interface ModalPanelProps {
  [key: string]: any;
}

export class ModalPanel extends React.Component<ModalPanelProps> {
  public state = {
    items: new Array<ModalItem>(),
  }

  constructor(props: ModalPanelProps) {
    super(props)
    ModalService.mount(this)
  }

  public hide = (keys?: string | string[]): Promise<void> => {
    const items: ModalItem[] = []
    if (keys && keys.length) {
      items.push(...this.state.items.filter(x => keys?.includes(x.key)))
    } else if (this.state.items.length) {
      items.push(this.state.items[this.state.items.length - 1])
    }
    if (items.length) {
      const promisesToHandle = items.map(x => {
        return new Promise<void>((res) => {
          const resolver = () => {
            x.isClosed = true
            res()
          }

          if (x.options?.useModalLayer && x.options.animationOptions?.isCloseAnimationEnabled) {
            x.ref.current?.animateClosing?.().then((isFinished: boolean) => {
              isFinished && x.options?.animationOptions?.onCloseAnimationFinished?.()
              resolver()
            })
          } else {
            x.ref.current?.close?.()
            resolver()
          }
        })
      })

      return Promise.all(promisesToHandle).then(() => {
        this.setState({ items: this.state.items.filter(x => !items.includes(x)) })
      })
    }
    return Promise.resolve()
  }

  public showComponent = (
    component: React.ElementType,
    options?: ModalOptions,
    params?: Partial<any>
  ): ModalItem => {
    const key: string = options?.desiredKey || this.generateKey()
    const Element = component
    const element = <Element {...params} />
    const item = {
      key,
      element,
      ref: createRef<any>(),
      options
    }
    this.setState({ items: this.state.items.concat(item) })
    return item
  }

  private generateKey = () => {
    return Math.random().toString(36).substring(2)
  }

  public show = (element: ReactElement, options: ModalOptions): ModalItem => {
    const key: string = options?.desiredKey || this.generateKey()
    const item = {
      key,
      element,
      ref: createRef<any>(),
      options
    }
    this.setState({ items: this.state.items.concat(item) })
    return item
  }

  public hasItems = (key?: string): boolean => {
    if (!key) {
      return this.state.items.length > 0
    }
    return !!this.state.items.find(x => x.key === key)
  }

  private onBottomSheetClose = (item: ModalItem, index: number) => {
    if (!item.isClosed && index <= 0 && item.options?.$resolve) {
      item.options.$resolve?.(null)
      item.options.$resolve = undefined
    }
  }

  private renderModal = (item: ModalItem): React.ReactNode => {
    if (item.options?.useModalLayer) {
      const modalLayer = (
        <ModalLayer
          ref={item.ref}
          animationOptions={item.options.animationOptions}
          key={item.key}
        >
          {item.element}
        </ModalLayer>
      )

      return isIos ? (
        <FullWindowOverlay key={item.key}>
          {modalLayer}
        </FullWindowOverlay>
      ) : modalLayer
    }

    return (
      <BottomSheetComponent
        key={item.key}
        ref={item.ref}
        backgroundStyle={item.backgroundStyle}
        onClose={() => this.onBottomSheetClose(item, 0)}
        {...item.options?.modalComponentParams}
      >
        {item.element}
      </BottomSheetComponent>
    )
  }

  public render(): React.ReactNode {
    const { items } = this.state

    return (
      <>
        <View
          style={styles.container}
          pointerEvents="box-none"
        >
          {items?.filter(x => !x.options?.useSafeArea).map(this.renderModal)}
        </View>
        <SafeAreaView
          mode="padding"
          edges={['bottom']}
          style={StyleSheet.absoluteFillObject}
          pointerEvents="box-none"
        >
          <View
            style={styles.container}
            pointerEvents="box-none"
          >
            {items?.filter(x => x.options?.useSafeArea).map(this.renderModal)}
          </View>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  }
})
