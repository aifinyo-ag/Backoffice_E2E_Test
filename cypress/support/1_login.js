//baseUrl is prod-staging-2
const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('login', () => {
    //login
    cy.visit(`${baseUrl}/sign_in`)
    cy.fixture('login').then((user) => {
        cy.get('#identity_email')
            .type(user.email)
        cy.get('#identity_password')
            .type(user.password)
    })
    cy.get('.btn')
        .should('contain', 'Anmelden')
        .click()
    cy.url(`${baseUrl}`)
    cy.log('Login successful')
})