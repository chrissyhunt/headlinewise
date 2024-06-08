/// <reference types="cypress" />

Cypress.Commands.add('getByData', (selector: string) => {
  return cy.get(`[data-test=${selector}]`)
})

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    getByData(selector: string): Chainable<JQuery<HTMLElement>>
    // login(email: string, password: string): Chainable<void>
  }
}
