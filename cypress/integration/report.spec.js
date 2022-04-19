// https://docs.cypress.io/api/introduction/api.html

describe('Report pull', () => {
  it('pulling a report', () => {
    // just testing general app frame and nav
    cy.visit('/')
    cy.get('[data-cy=reports-section]').click()
    cy.contains('h1', 'No reports')
    cy.get('[data-cy=from-date-button]').click()
    cy.get('[data-cy=from-date').type('2021-01-01')
    cy.get('[data-cy=to-date-button]').click()
    cy.get('[data-cy=to-date').type('2021-12-31')
    cy.get('[data-cy=generate-report]').click()
    cy.contains('[data-cy=breadcrumbs]', 'All projects | All gateways')
  })
})
