//baseUrl is prod-staging-2
const baseUrl = Cypress.config('baseUrl')

//Generate a random username
const randomUsername = generateRandomUsername(10)
function generateRandomUsername(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

describe('User', () => {

    beforeEach(() => {
        cy.login() //see cypress/support/login.js
    })

    afterEach(() => {
        //cy.logout() //see cypress/support/logout.js
    })

    it('Create new user', () => {        
        cy.UserTab() //see cypress/support/2_tabs.js
        //click on plus-button to create new user
        cy.get('.btn-default')
            .click()
        cy.get('.modal-content') //check if modal is open
            .should('be.visible')
        cy.get('.modal-header')
            .should('contain', 'Neuer Benutzer')
        
        //fill out modal for new user
        //Fill out username field
        cy.get('#email_identity_user_attributes_name')
            .type(randomUsername)
        
        //Fill out email field
        cy.get('#email_identity_email')
            .type(randomUsername + '@test.com')

        //Fill out telephone number field
        //Generate a random telephone number
        const randomPhonenumber = generateRandomPhonenumber(8)
            function generateRandomPhonenumber(length) {
                let result = ''
                const characters = '0123456789'
                const charactersLength = characters.length
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength))
                }
                return result
            }
        cy.get('#email_identity_user_attributes_phone')
            .type('0157' + randomPhonenumber)

        //Check if the user is an administrator or an agency
        const randomOption = Math.random() < 0.5 ? 'admin' : 'agency'
        if (randomOption === 'admin') {
            cy.get('#email_identity_user_attributes_admin')
            .check()
        } else {
            cy.get('#email_identity_user_attributes_agency')
            .check()
        }
        cy.wait(500)

        //Click the save button
        cy.get('.modal-footer > .btn-primary')
            .should('contain', 'Speichern')
            .click()
        cy.wait(500)
        cy.log('User created')
    })

    it('Search new user and cancel the process for editing', () => {
        cy.UserTab() //see cypress/support/2_tabs.js
        //search for the user created in the previous test
        //random choice between pressing enter or clicking the filter button
        const randomOption = Math.random() < 0.5 ? 'enter' : 'button'
        if (randomOption === 'enter') {
            //press enter
            cy.get('#query')
                .type(randomUsername + '@test.com {enter}')
        } else {
            //click the filter button
            cy.get('#query')
                .type(randomUsername + '@test.com')
            cy.get('.btn-primary')
                .should('contain', 'Filtern')
                .click()
        }

        // Verify if the user is displayed in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .should('be.visible')
        cy.log('User found')

        // Click on the first column of the user in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .parent()
            .find('td')
            .eq(0)
            .click()
        cy.url(`${baseUrl}/admin/users/´`)
        cy.log('User opened')
        cy.go('back')
        cy.url(`${baseUrl}/admin/users`)
    })

    it('Search and edit new user', () => {
        cy.UserTab() //see cypress/support/2_tabs.js
        //search for the user created in the previous test
        //random choice between pressing enter or clicking the filter button
        const randomOption = Math.random() < 0.5 ? 'enter' : 'button'
        if (randomOption === 'enter') {
            //press enter
            cy.get('#query')
                .type(randomUsername + '@test.com {enter}')
        } else {
            //click the filter button
            cy.get('#query')
                .type(randomUsername + '@test.com')
            cy.get('.btn-primary')
                .should('contain', 'Filtern')
                .click()
        }

        // Verify if the user is displayed in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .should('be.visible')
        
        // Click on the first column of the user in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .parent()
            .find('td')
            .eq(0)
            .click()
        cy.url(`${baseUrl}/admin/users/´`)

        //edit user
        //Add Account and save changes
        cy.get('#user_account_id')
            .type(randomUsername + '{enter}')
        cy.get('.flash-message-component')
            .should('contain', 'Benutzer erfolgreich gespeichert')
        cy.log('User edited')
    })

    it('Search and delete new user', () => {
        cy.UserTab() //see cypress/support/2_tabs.js
        //search for the user created in the previous test
        //random choice between pressing enter or clicking the filter button
        const randomOption = Math.random() < 0.5 ? 'enter' : 'button'
        if (randomOption === 'enter') {
            //press enter
            cy.get('#query')
                .type(randomUsername + '@test.com {enter}')
        } else {
            //click the filter button
            cy.get('#query')
                .type(randomUsername + '@test.com')
            cy.get('.btn-primary')
                .should('contain', 'Filtern')
                .click()
        }

        // Verify if the user is displayed in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .should('be.visible')
        
        // Click on the first column of the user in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .parent()
            .find('td')
            .eq(0)
            .click()
        cy.url(`${baseUrl}/admin/users/´`)

        //delete user
        //Login status button
        cy.get('.btn-transparent')
            .should('contain', 'Login freigeschaltet')
            .click()
        cy.get('#remove-submit') //delete button
            .should('contain', 'Benutzer löschen')
            .click()
    })

    it('Verify if the new user is deleted', () => {
        cy.UserTab() //see cypress/support/2_tabs.js
        //search for the user delelted in the previous test
        //random choice between pressing enter or clicking the filter button
        const randomOption = Math.random() < 0.5 ? 'enter' : 'button'
        if (randomOption === 'enter') {
            //press enter
            cy.get('#query')
                .type(randomUsername + '@test.com {enter}')
        } else {
            //click the filter button
            cy.get('#query')
                .type(randomUsername + '@test.com')
            cy.get('.btn-primary')
                .should('contain', 'Filtern')
                .click()
        }

        // Verify if the user is not displayed in the table
        cy.get('.card-box')
            .contains('td', randomUsername.substring(0, 3))
            .should('not.exist')
        cy.log('User deleted')
    })

})