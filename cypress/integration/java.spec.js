Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach = () => {
    cy.fixture("example").as("example");
}


it("Write java in input and show details, \n and closes the popup ", () => {
    cy.visit("http://localhost:3000/");
    cy.get('.blip-detail-sheet').should('not.exist')
    cy.get('input').type('java').type('{enter}')
    cy.get('.blip-detail-sheet').should('be.visible')
    cy.get('#blip-close-mobile button').should('exist')
    cy.get('#blip-close-mobile button').click({multiple: true, force: true});
    cy.get('.blip-detail-sheet').should('not.exist')
});

it("Write jav(wrong) in input and show details, \n and closes the popup ", () => {
    cy.visit("http://localhost:3000/");
    cy.get('.blip-detail-sheet').should('not.exist')
    cy.get('input').type('jav').type('{enter}')
    cy.get('input').should('contain', '')
    cy.get('.blip-detail-sheet').should('not.exist')
});

it("Hover on kotlin and apereance from muitooltip-popper", () => {
    cy.visit("http://localhost:3000/");
    cy.get('.MuiTooltip-popper').should('not.exist')
    cy.get('g[title="Kotlin"]').should('exist')
    cy.get('g[title="Kotlin"]').trigger('mouseover')
    cy.get('.MuiTooltip-popper').should('exist').should('be.visible')
    //TODO Mouse out
});

it("Click on Bitbucket", () => {
    cy.visit("http://localhost:3000/");
   
    cy.get('g[title="Bitbucket"]').should('exist')
    cy.get('.blip-detail-sheet').should('not.exist')
    cy.get('g[title="Bitbucket"]').click()
    cy.get('.blip-detail-sheet').should('be.visible')
    cy.get('#blip-close-mobile button').should('exist')
    cy.get('#blip-close-mobile button').click({multiple: true, force: true}); //TODO
    cy.get('.blip-detail-sheet').should('not.exist')

});


it("Click on Plattform", () => {
    cy.visit("http://localhost:3000/");
   
    cy.get('#plattform').should('exist')
    cy.get('.list-parent').should('not.exist')
    cy.get('#plattform').click()
    cy.get('.blips-list').should('be.visible')
    //cy.get('.radar-svg').should('be.not.visible') TODO
    cy.get('#alleQ').click()
    cy.get('.list-parent').should('not.exist')
    cy.get('.radar-svg').should('be.visible')
    
});


it("Click on Microsoft", () => {
    cy.visit("http://localhost:3000/");
   
    cy.get('#microTab').should('exist')
    //cy.get('MSDataService').should('not.exist')
    cy.url().should('not.include', 'http://localhost:3000/microsoft')
    cy.get('#microTab').click()
   // cy.get('MSDataService').should('exist') TODO?   
    cy.url().should('include', 'http://localhost:3000/microsoft')
    
});

it("Click on Microsoft with blip-list", () => {
    cy.visit("http://localhost:3000/");
   
    cy.get('#plattform').should('exist')
    cy.get('.list-parent').should('not.exist')
    cy.get('#plattform').click()
    cy.get('.blips-list').should('be.visible')
    cy.get('#microTab').should('exist')
    //cy.get('MSDataService').should('not.exist')
    cy.url().should('not.include', 'http://localhost:3000/microsoft')
    cy.get('#microTab').click()
   // cy.get('MSDataService').should('exist') TODO?   
    cy.url().should('include', 'http://localhost:3000/microsoft')
    cy.get('.list-parent').should('not.exist')
    cy.get('.radar-svg').should('be.visible')
    
});

    //Test, dass überprüft ob es überhaupt blips gibt

