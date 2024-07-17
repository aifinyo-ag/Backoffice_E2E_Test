//baseUrl is prod-staging-2
const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('UserTab', () => {
    cy.get('[href="/admin/users"]')
            .should('contain', 'Benutzer')
            .click()
        cy.url(`${baseUrl}/admin/users`)
})