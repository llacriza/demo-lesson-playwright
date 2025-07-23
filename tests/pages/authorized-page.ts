import { BasePage } from './base-page'
import type { Locator} from '@playwright/test'
import type { Page } from '@playwright/test'

export class AuthorizedPage extends BasePage {
  readonly buttonStatus: Locator
  readonly buttonLogout: Locator
  readonly inputOrderNumber: Locator
  readonly buttonTrackingOrder: Locator

  constructor(page: Page) {
    super(page)

    this.buttonStatus = page.locator('.header__button_check-order')
    this.buttonLogout = page.locator('.header__button_exit')
    this.inputOrderNumber = page.getByTestId('searchOrder-input')
    this.buttonTrackingOrder = page.locator('[data-name="searchOrder-submitButton"]')
  }
}