import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFound } from '../pages/order-not-found'
import { OrderFound } from '../pages/order-found'

let authPage: LoginPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('error message incorrect credentials', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill('testtest')
  await authPage.signInButton.click()
  await expect(authPage.errorMessage).toHaveText('×Incorrect credentials')
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect.soft(orderCreationPage.buttonStatus).toBeVisible()
  await expect.soft(orderCreationPage.orderButton).toBeVisible()
  await expect.soft(orderCreationPage.name).toBeVisible()
  await expect.soft(orderCreationPage.phone).toBeVisible()
  await expect.soft(orderCreationPage.comment).toBeVisible()
  await expect.soft(orderCreationPage.buttonLogout).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.name.fill(faker.lorem.word(2))
  await orderCreationPage.phone.fill('1234567890')
  await orderCreationPage.comment.fill('cake')
  await orderCreationPage.orderButton.click()
  await expect.soft(orderCreationPage.notificationPopUp).toBeVisible()
  await expect
    .soft(orderCreationPage.notificationPopUp)
    .toHaveText('×Order has been created!Tracking code: undefinedok')
})

test('login and logout', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.buttonLogout.click()
  await expect.soft(authPage.signInButton).toBeVisible()
})

test('Order not found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.buttonStatus.click()
  await orderCreationPage.inputOrderNumber.fill('0000')
  await orderCreationPage.buttonTrackingOrder.click()
  const orderNotFoundPage = new OrderNotFound(page)
  await expect.soft(orderNotFoundPage.orderNotFoundTitle).toBeVisible()
  await expect.soft(orderNotFoundPage.orderNotFoundMessage).toBeVisible()
  await expect.soft(orderNotFoundPage.orderNotFoundImage).toBeVisible()
})

test('Order found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.buttonStatus.click()
  await orderCreationPage.inputOrderNumber.fill('10430')
  await orderCreationPage.buttonTrackingOrder.click()
  const orderFoundPage = new OrderFound(page)
  await expect.soft(orderFoundPage.input).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationName).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationPhone).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationComment).toBeVisible()
  await expect.soft(orderFoundPage.orderStatusOpen).toBeVisible()
  await expect.soft(orderFoundPage.orderStatusAccepted).toBeVisible()
  await expect.soft(orderFoundPage.orderStatusInProgress).toBeVisible()
  await expect.soft(orderFoundPage.orderStatusDelivered).toBeVisible()
})
