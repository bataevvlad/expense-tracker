import { ModalService } from './ModalService'

describe('ModalService', () => {
  it('should initialize without errors', () => {
    expect(ModalService).toBeTruthy()
  })

  it('should mount successfully', () => {
    const mockPanel = { show: jest.fn(), hide: jest.fn(), hasItems: jest.fn() }
    const mockLogger = { logInfo: jest.fn(), logWarn: jest.fn(), logError: jest.fn() }

    // @ts-ignore
    ModalService.mount(mockPanel, mockLogger)

    expect(ModalService.panel).toBe(mockPanel)
    expect(ModalService.logger).toBe(mockLogger)
  })
})
