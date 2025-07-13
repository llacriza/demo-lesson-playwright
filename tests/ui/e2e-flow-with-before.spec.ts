import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'

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

test('error message displayed when incorrect credentials', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(8))
  await authPage.signInButton.click()
  await expect(authPage.errorMessage).toHaveText('×Incorrect credentials')
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect.soft(orderCreationPage.statusButton).toBeVisible()
  await expect.soft(orderCreationPage.orderButton).toBeVisible()
  await expect.soft(orderCreationPage.name).toBeVisible()
  await expect.soft(orderCreationPage.comment).toBeVisible()
  await expect.soft(orderCreationPage.phone).toBeVisible()
  await expect.soft(orderCreationPage.logoutButton).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.name.fill(faker.lorem.word(5))
  await orderCreationPage.phone.fill('45339067')
  await orderCreationPage.comment.fill('take')
  await orderCreationPage.orderButton.click()
  await expect.soft(orderCreationPage.notificationPopUp).toBeVisible()
  await expect
    .soft(orderCreationPage.notificationPopUp)
    .toHaveText('×Order has been created!Tracking code: undefinedok')
})

test('Login and logout', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.logoutButton.click()
  await expect.soft(authPage.signInButton).toBeVisible()
})
