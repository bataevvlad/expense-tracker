import { ModalServiceResultStatus } from '@expense-tracker/shared-types'

export class ModalServiceAsyncResult {
  constructor(protected resultStatus: ModalServiceResultStatus, protected _result?: any) {
  }

  get result(): any {
    return this._result
  }

  get status(): ModalServiceResultStatus {
    return this.resultStatus || ModalServiceResultStatus.None
  }
}
