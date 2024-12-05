import { BottomSheetComponent } from '@expense-tracker/components-library'
import { ModalItem, ModalOptions } from '@expense-tracker/shared-types'
import type { SNAP_POINT_TYPE } from '@gorhom/bottom-sheet/lib/typescript/constants'
import * as React from 'react'
import { createRef, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ModalLayer } from './ModalLayer'
import { ModalService } from './ModalService'

export class ModalPanel extends React.Component<any> {
  public state = {
    items: new Array<ModalItem>(),
  }

  constructor(props: any) {
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
      const promisesToHandle: any = items.map(x => {
        return new Promise<void>((res) => {
          const resolver = () => {
            x.isClosed = true
            res()
          }
          if (x.options?.useModalLayer && x.options.animationOptions?.isCloseAnimationEnabled) {
            x.ref.current?.animateClosing().then((isFinished: any) => {
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

  public showComponent(component: React.ElementType,
    options?: ModalOptions,
    params?: Partial<any>): ModalItem {
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

  private generateKey() {
    return Math.random().toString(36).substring(2)
  }

  public show(element: ReactElement, options: ModalOptions): ModalItem {
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
      return this.state.items && this.state.items.length > 0
    } else {
      return !!this.state.items.find(x => x.key === key)
    }
  }

  onBottomSheetClose = (item: ModalItem, index: number) => {
    console.log('onBottomSheetClose', item, index)
    if (!item.isClosed && index <= 0 && item.options?.$resolve) {
      item.options?.$resolve?.(null)
      item.options.$resolve = undefined
    }
  }

  onChange = (
    index: number,
    position: number,
    type: SNAP_POINT_TYPE
  ) => {
    console.log('onChange', `index: ${index}`, `position: ${position}`, `type: ${type}`)
  }


  private renderModal = (item: ModalItem): React.ReactNode => {
    if (item.options?.useModalLayer) {
      return (
        <ModalLayer
          ref={item.ref}
          animationOptions={item.options.animationOptions}
          key={item.key}
        >
          {item.element}
        </ModalLayer>
      )
    } else {
      return (
        <BottomSheetComponent
          key={ item.key }
          ref={ item.ref }
          backgroundStyle={ item.backgroundStyle }
          onChange={this.onChange}
          onClose={() => this.onBottomSheetClose(item, 0)}
          {...item.options?.modalComponentParams}
        >
          {item.element}
        </BottomSheetComponent>
      )
    }
  }

  public render(): React.ReactNode {
    const { items } = this.state
    return (
      <>
        <View
          style={styles.container}
          pointerEvents={'box-none'}
        >
          {!!items && items.filter(x => !x.options?.useSafeArea).map(x => this.renderModal(x))}
        </View>
        <SafeAreaView
          mode={ 'margin' }
          edges={ ['bottom'] }
          style={styles.container}
          pointerEvents={'box-none'}
        >
          <View
            style={styles.container}
            pointerEvents={'box-none'}
          >
            {!!items && items.filter(x => x.options?.useSafeArea).map(x => this.renderModal(x))}
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
