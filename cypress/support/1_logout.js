Cypress.Commands.add('logout', () => {
    cy.get(':nth-child(4) > .nav-link')
        .should('contain', 'Abmelden')
        .click()
    cy.log('Logout successful')
})