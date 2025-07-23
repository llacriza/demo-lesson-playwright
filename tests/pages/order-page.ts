import type { Locator} from '@playwright/test'
import type { Page } from '@playwright/test'
import { AuthorizedPage } from './authorized-page'

export class OrderPage extends AuthorizedPage {
  readonly name: Locator
  readonly phone: Locator
  readonly comment: Locator
  readonly orderButton: Locator
  readonly notificationPopUp: Locator
  readonly notificationPopUpText: Locator
  readonly notificationPopUpOkButton: Locator

  constructor(page: Page) {
    super(page)
    this.name = page.getByTestId('username-input')
    this.phone = page.getByTestId('phone-input')
    this.comment = page.getByTestId('comment-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.notificationPopUp = page.getByTestId('orderSuccessfullyCreated-popup')
    this.notificationPopUpText = page.locator('.notification-popup__text')
    this.notificationPopUpOkButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
  }
}