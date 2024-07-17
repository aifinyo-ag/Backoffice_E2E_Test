//baseUrl is prod-staging-2
const baseUrl = Cypress.config('baseUrl')

describe('Tabs', () => {

    beforeEach(() => {
        cy.login() //see cypress/support/login.js
    })

    afterEach(() => {
        cy.logout() //see cypress/support/logout.js
    })

    //all tabs exclude "Risiko"
    it('Click through all tabs', () => {        
        //Benutzer-Tab
        cy.UserTab() //see cypress/support/2_tabs.js

        //Geschäftspartner-Tab
        cy.get('[href="/admin/partners"]')
            .should('contain', 'Geschäftspartner')
            .click()
        cy.url(`${baseUrl}/admin/partners`)

        //Aufträge-Tab
        cy.get('[href="/admin/orders"]')
            .should('contain', 'Aufträge')
            .click()
        cy.url(`${baseUrl}/admin/orders`)

        //Annehmen-Tab
        cy.get('[href="/admin/business/syntax"]')
            .should('contain', 'Annehmen')
            .click()
        cy.url(`${baseUrl}/admin/business/syntax`)

        //Prüfen-Tab
        cy.get('[href="/admin/business/limits"]')
            .should('contain', 'Prüfen')
            .click()
        cy.url(`${baseUrl}/admin/business/limits`)

        //Verität-Tab
        cy.get('[href="/admin/business/verifications"]')
            .should('contain', 'Verität')
            .click()
        cy.url(`${baseUrl}/admin/business/verifications`)

        //Freigabe-Tab
        cy.get('[href="/admin/legitimation"]')
            .should('contain', 'Freigabe')
            .click()
        cy.url(`${baseUrl}/admin/legitimation`)

        //Auszahlen-Tab
        cy.get('[href="/admin/business/payout"]')
            .should('contain', 'Auszahlen')
            .click()
        cy.url(`${baseUrl}/admin/business/payout`)

        //Dunning-Tab
        cy.get('[href="/admin/dunnings"]')
            .should('contain', 'Dunning')
            .click()
        cy.url(`${baseUrl}/admin/dunnings`)

        //Inkasso-Tab
        cy.get('[href="/admin/collections"]')
            .should('contain', 'Inkasso')
            .click()
        cy.url(`${baseUrl}/admin/collections`)

        //Einzahlungen-Tab
        cy.get('[href="/admin/bank_transactions"]')
            .should('contain', 'Einzahlungen')
            .click()
        cy.url(`${baseUrl}/admin/bank_transactions`)

        //Tools-Tab
        cy.get('[href="/admin/outgoing_messages/index"]')
            .should('contain', 'Tools')
            .click()
        cy.url(`${baseUrl}/admin/outgoing_messages/index`)

        //Export-Tab
        cy.get('[href="/admin/export"]')
            .should('contain', 'Export')
            .click()
        cy.url(`${baseUrl}/admin/export`)

        //Einstellungen-Tab
        cy.get('[href="/admin/business/settings"]')
            .should('contain', 'Einstellungen')
            .click()
        cy.url(`${baseUrl}/admin/business/settings`)
    })
})