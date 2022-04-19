// https://docs.cypress.io/api/introduction/api.html

describe('Main', () => {
  it('visits the app root url', () => {
    // just testing general app frame and nav
    cy.visit('/')
    cy.get('[data-cy=reports-section]').click()
    cy.contains('h1', 'Reports')
    cy.contains('button', 'Select project')
    cy.contains('button', 'Select gateway')
    cy.contains('button', 'Generate report')
    cy.contains('button', 'From date')
    cy.contains('button', 'To date')
    cy.contains('h1', 'No reports')
  })
})
