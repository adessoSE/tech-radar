import { isTSAnyKeyword } from "@babel/types";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach = () => {
    cy.fixture("example").as("example");
}

describe("Loading page...", () => {
    it("Visits Java Techradar", () => {
        cy.visit("http://localhost:3000/");
        cy.visit('http://localhost:3000/java')
    });
    it("Visits Microsoft Techradar", () => {
        cy.visit("http://localhost:3000/mircosoft");
    });
    it("Visits JS Techradar", () => {
        cy.visit("http://localhost:3000/javascript");
    });
    it("Visits FAQ", () => {
        cy.visit("http://localhost:3000/faq");
    });
});

describe('Testing all components ... on page Java', () => {
    it("Write java in input and show details, \n and closes the popup ", () => {
        cy.visit("http://localhost:3000/");
        cy.get('.blip-detail-sheet').should('not.exist')
        cy.get('input').type('java').type('{enter}')
        cy.get('.blip-detail-sheet').should('be.visible')
        cy.get('#blip-close-mobile button').should('exist')
        cy.get('#blip-close-mobile button').click({force: true, multiple: true});
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
        cy.get('#Kotlin').should('exist')
        cy.get('#Kotlin').trigger('mouseover')
        cy.get('.MuiTooltip-popper').should('exist').should('be.visible')
        cy.get('#Kotlin').trigger('mouseout')
        cy.get('.MuiTooltip-popper').should('not.exist')
    });
    
    it("Click on Bitbucket", () => {
        cy.visit("http://localhost:3000/");
       
        cy.get('g[title="Bitbucket"]').should('exist')
        cy.get('.blip-detail-sheet').should('not.exist')
        cy.get('g[title="Bitbucket"]').click()
        cy.get('.blip-detail-sheet').should('be.visible')
        cy.get('#blip-close-mobile button').should('exist')
        cy.get('#blip-close-mobile button').click({force: true, multiple: true}); 
        cy.get('.blip-detail-sheet').should('not.exist')
    
    });
    
    
    it("Click on Plattform", () => {
        cy.visit("http://localhost:3000/");
       
        cy.get('#plattform').should('exist')
        cy.get('.list-parent').should('not.exist')
        cy.get('#plattform').click()
        cy.get('.blips-list').should('be.visible')
        cy.get('.radar-svg').should('not.exist')
        cy.get('input').should('not.exist')
        cy.get('#alleQ').click()
        cy.get('.list-parent').should('not.exist')
        cy.get('.radar-svg').should('be.visible')
        cy.get('input').should('be.visible')
    });
    
    it('Click on one element in Plattform . . . ', () => {
        cy.visit("http://localhost:3000/");
       
        cy.get('#plattform').should('exist')
        cy.get('.list-parent').should('not.exist')
        cy.get('#plattform').click()
        cy.get('.blips-list').should('be.visible')
        cy.get('.radar-svg').should('not.exist')
        cy.get('input').should('not.exist')
        cy.get('.blip-detail-sheet').should('not.exist')
        cy.contains('Gitlab').should('exist').and('be.visible')
        cy.contains('Gitlab').click()
        cy.get('.blip-detail-sheet').should('be.visible')
        cy.get('#blip-close-mobile').should('exist')
        cy.get('#blip-close-mobile').click()
        cy.get('.blip-detail-sheet').should('not.exist')
    })
    
    it("Click on Microsoft", () => {
        cy.visit("http://localhost:3000/");
       
        cy.get('#microTab').should('exist')
        cy.get('#msds').should('not.exist')
        cy.url().should('not.include', 'http://localhost:3000/microsoft')
        cy.get('#microTab').click()
        cy.get('#msds').should('exist')  
        cy.url().should('include', 'http://localhost:3000/microsoft')
    });
    
    it("Click on Microsoft with blip-list", () => {
        cy.visit("http://localhost:3000/");
       
        cy.get('#plattform').should('exist')
        cy.get('.list-parent').should('not.exist')
        cy.get('#plattform').click()
        cy.get('.blips-list').should('be.visible')
        cy.get('#microTab').should('exist')
        cy.get('#msds').should('not.exist')
        cy.url().should('not.include', 'http://localhost:3000/microsoft')
        cy.get('#microTab').click()
        cy.get('#msds').should('exist')    
        cy.url().should('include', 'http://localhost:3000/microsoft')
        cy.get('.list-parent').should('not.exist')
        cy.get('.radar-svg').should('be.visible')
        
    });

    it('Test mobile quadrant buttons based on device width', () => {
        cy.visit('http://localhost:3000/')
        cy.viewport(1500, 980)

        cy.get('#mobile-plattform').should('not.be.visible')
        cy.viewport('iphone-6')
        cy.get('#mobile-plattform').should('be.visible')
        cy.get('#mobile-plattform').click()
        cy.get('#mobile-plattform').should('not.exist')

        cy.get('.radar-svg').should('not.exist')
        cy.get('input').should('not.exist')
        cy.get('.blips-list').should('exist').and('be.visible')
        cy.get('#alleQ').should('exist').and('be.visible')

        cy.get('#alleQ').click()
        cy.get('.blips-list').should('not.exist').and('not.be.visible')
        cy.get('.radar-svg').should('exist').and('be.visible')
        cy.get('input').should('exist').and('be.visible')
        cy.get('.quadrant-buttons').should('exist').and('be.visible')
    })
})

describe('Test FAQ page ... ', () => {
    it('Click on faq', () => {
        cy.visit('http://localhost:3000/')
        cy.get('.faq-container').should('not.exist')
        cy.get('#faq').should('exist')
        cy.get('#faq').click()
        cy.get('.faq-container').should('exist')
        cy.get('.radar-root').should('not.exist')
        
        cy.get('#javaTab').should('exist')
        cy.get('#javaTab').click()
        cy.get('.faq-container').should('not.exist')
        cy.get('.radar-root').should('exist').should('be.visible')
    })

    it('Click on "here" . . .', () => {
        cy.visit('http://localhost:3000/faq')
        cy.get('#gitlab').should('exist').and('be.visible')
        cy.get('#gitlab').should('have.attr', 'href')
            .and('include', 'https://gitlab.com/thomas.franz/adesso-technologie-radar')

        cy.get('#scm').should('exist').and('be.visible')
        cy.get('#scm').should('have.attr', 'href')
            .and('include', 'https://scm.adesso.de/scm/git/adesso/techradar')
    })
})


