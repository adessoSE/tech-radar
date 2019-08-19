Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach = () => {
    cy.fixture("example").as("example");
}
describe("Techradar adesso", () => {
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