describe('smoke tests', () => {
    it('should display form and button for login', () => {
        cy.visit('/#/');
        cy.getbySel('nav-link-login').should("be.visible");
        cy.getbySel('nav-link-login').click();
        cy.getbySel('login-input-username').should('be.visible');
        cy.getbySel('login-input-password').should('be.visible');
        cy.getbySel('login-submit').should('be.visible');
    });
    it('should display add to cart button when logged in', () => {
        cy.loginFront();
        cy.getbySel('product-home-link').first().click();
        cy.getbySel('detail-product-add').should('be.visible');
    });
});