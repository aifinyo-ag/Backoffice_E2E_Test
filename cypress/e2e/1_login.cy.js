//baseUrl is prod-staging-2
const baseUrl = Cypress.config('baseUrl')

describe('Login', () => {
    it('Login with invalid credentials', () => {
        cy.visit(`${baseUrl}/sign_in`)
        
        const randomEmail = Math.random().toString(36).substring(2, 12) + '@example.com' //generate random email
        cy.get('#identity_email')
            .type(randomEmail)
        cy.get('#identity_password')
            .type('2nWb!VFvyWg2^ZH^')
        cy.get('.btn')
            .should('contain', 'Anmelden')
            .click()

        //error message
        cy.get('.flash-message-component__message')
            .should('contain', 'E-Mail oder Passwort ist ungültig.')
        cy.log('Login failed')
    })

    it('Login with valid credentials & logout', () => {
        //login
        cy.login() //see cypress/support/login.js

        //logout
        cy.logout() //see cypress/support/logout.js
    })
})
