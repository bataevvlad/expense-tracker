import {
  MODAL_KEYS,
  ModalItem,
  ModalOptions,
  ModalServiceBaseComponentProps,
  ModalServiceResultStatus,
} from '@expense-tracker/shared-types'
import React, { ReactElement } from 'react'

import { ModalPanel } from './ModalPanel'
import { ModalServiceDefaultLogger } from './serviceResult/defaultLogger'
import { ModalServiceAsyncResult } from './serviceResult/ModalServiceAsyncResult'
import { ModalServiceResult } from './serviceResult/ModalServiceResult'

class ModalServiceType {
  panel: ModalPanel|undefined
  logger: { logInfo: (t:any) => void, logWarn: (t:any) => void, logError: (t:any) => void }|undefined

  public mount(panel: ModalPanel, loger?: { logInfo: (t:any) => void, logWarn: (t:any) => void, logError: (t:any) => void }): void {
    this.panel = panel
    this.logger = loger || new ModalServiceDefaultLogger()
  }

  public showComponent<P>(component: React.ElementType<P>,
    options?: ModalOptions,
    params?: Partial<any>): ModalServiceResult {
    this.logger?.logInfo(`[ModalService] showComponent: ${JSON.stringify(options)}`)
    if (options?.desiredKey && this.hasActiveModal(options.desiredKey)) {
      this.logger?.logWarn(`[ModalService] Attempt to open another ${options?.desiredKey} while there is active one exists.`)
      return new ModalServiceResult(ModalServiceResultStatus.ModalAlreadyOpened)
    }
    const item = this.panel?.showComponent(component, options, params)
    if (!item) {
      return new ModalServiceResult(ModalServiceResultStatus.NotInitialized)
    }
    return new ModalServiceResult(ModalServiceResultStatus.Ready, item)
  }

  public show(element: ReactElement, options: ModalOptions): ModalServiceResult {
    this.logger?.logInfo(`[ModalService] show: ${JSON.stringify(options)}`)
    if (options?.desiredKey && this.hasActiveModal(options.desiredKey)) {
      this.logger?.logWarn(`[ModalService] Attempt to open another ${options?.desiredKey} while there is active one exists.`)
      return new ModalServiceResult(ModalServiceResultStatus.ModalAlreadyOpened)
    }
    const item = this.panel?.show(element, options)
    if (!item) {
      return new ModalServiceResult(ModalServiceResultStatus.NotInitialized)
    }
    return new ModalServiceResult(ModalServiceResultStatus.Ready, item)
  }

  public showComponentAsync<P>(component: React.ComponentType<P>,
    options?: ModalOptions,
    params?: Partial<any>): Promise<ModalServiceAsyncResult> {
    let item: ModalItem | undefined
    this.logger?.logInfo(`[ModalService] componentName: ${component.displayName} showComponentAsync: ${JSON.stringify(options)}`)
    if (options?.desiredKey && this.hasActiveModal(options.desiredKey)) {
      this.logger?.logWarn(`[ModalService] Attempt to open another ${options?.desiredKey} while there is active one exists.`)
      return Promise.resolve(new ModalServiceAsyncResult(ModalServiceResultStatus.ModalAlreadyOpened))
    }
    return new Promise<any>(((resolve, reject) => {
      item = this.panel?.showComponent(component, Object.assign(options ?? {},
        { $resolve: resolve, $reject: reject }), Object.assign(params ?? {}, { resolve, reject } as ModalServiceBaseComponentProps))
    }))
      .then((result) => {
        return this.hide(item?.key)
          .then(() => new ModalServiceAsyncResult(ModalServiceResultStatus.Ready, result))
      })
      .catch((error) => {
        return this.hide(item?.key)
          .then(() => {
            throw(error)
          })
      }).finally(() => {
        // No cleanup needed
      })
  }

  public showAsync(element: ReactElement, options: ModalOptions): Promise<ModalServiceAsyncResult> {
    let item: ModalItem | undefined
    this.logger?.logInfo(`[ModalService] showAsync: ${JSON.stringify(options)}`)
    if (options?.desiredKey && this.hasActiveModal(options.desiredKey)) {
      this.logger?.logWarn(`[ModalService] Attempt to open another ${options?.desiredKey} while there is active one exists.`)
      return Promise.resolve(new ModalServiceAsyncResult(ModalServiceResultStatus.ModalAlreadyOpened))
    }
    return new Promise<any>(((resolve, reject) => {
      const cloned = React.cloneElement(element, { resolve, reject } as ModalServiceBaseComponentProps)
      item = this.panel?.show(cloned, Object.assign(options ?? {}, { $resolve: resolve, $reject: reject }))
    }))
      .then((result) => {
        return this.hide(item?.key)
          .then(() => new ModalServiceAsyncResult(ModalServiceResultStatus.Ready, result))
      })
      .catch((error) => {
        return this.hide(item?.key)
          .then(() => {
            throw(error)
          })
      })
      .finally(() => {
        // No cleanup needed
      })
  }

  public hide(key?: string | string[]): Promise<void> {
    this.logger?.logInfo(`[ModalService] hide: ${key}`)
    if (!this.panel) {
      return Promise.resolve()
    }
    return this.panel.hide(key)
  }

  public hideAll(): void {
    this.logger?.logInfo('[ModalService] hide all')
    Object.values(MODAL_KEYS)
      .forEach((key) => this.panel!.hide(key))
  }

  public hasActiveModal(key?: string): boolean {
    return !!this.panel?.hasItems(key)
  }
}

export const ModalService = new ModalServiceType()
