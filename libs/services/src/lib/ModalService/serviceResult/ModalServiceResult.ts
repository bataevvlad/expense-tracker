import { ModalItem, ModalServiceResultStatus } from '@expense-tracker/shared-types'

export class ModalServiceResult {
  constructor(protected resultStatus: ModalServiceResultStatus, protected item?: ModalItem) {
  }

  get key(): string | undefined {
    return this.item?.key
  }

  get status(): ModalServiceResultStatus {
    return this.resultStatus || ModalServiceResultStatus.None
  }
}
