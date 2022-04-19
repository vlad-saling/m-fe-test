import { mount } from '@cypress/vue'
import Header from '../Header.vue'

describe('Header', () => {
  it('playground', () => {
    mount(Header, { props: { msg: 'Hello Cypress' } })
  })

  it('renders properly', () => {
    mount(Header, { props: { msg: 'Hello Cypress' } })
    cy.get('h1').should('contain', 'Hello Cypress')
  })
})
