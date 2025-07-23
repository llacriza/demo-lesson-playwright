import type { Locator} from '@playwright/test'
import type {Page} from '@playwright/test'
import { AuthorizedPage } from './authorized-page'

export class OrderFound extends AuthorizedPage {
  readonly input: Locator
  readonly orderInformationName: Locator
  readonly orderInformationPhone: Locator
  readonly orderInformationComment: Locator
  readonly orderStatusOpen: Locator
  readonly orderStatusAccepted: Locator
  readonly orderStatusInProgress: Locator
  readonly orderStatusDelivered: Locator

  constructor(page: Page) {
    super(page)
    this.input = page.getByTestId('useless-input')
    this.orderInformationName = page.getByTestId('order-item-0')
    this.orderInformationPhone = page.getByTestId('order-item-1')
    this.orderInformationComment = page.getByTestId('order-item-2')
    this.orderStatusOpen = page.getByTestId('status-item-0')
    this.orderStatusAccepted = page.getByTestId('status-item-1')
    this.orderStatusInProgress = page.getByTestId('status-item-2')
    this.orderStatusDelivered = page.getByTestId('status-item-3')
  }
}