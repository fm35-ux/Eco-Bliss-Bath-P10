describe('smoke tests', () => {
    it('should display form and button for login', () => {
        cy.visit('/#/');
        cy.getbydataCy('nav-link-login').should("be.visible");
        cy.getbydataCy('nav-link-login').click();
        cy.getbydataCy('login-input-username').should('be.visible');
        cy.getbydataCy('login-input-password').should('be.visible');
        cy.getbydataCy('login-submit').should('be.visible');
    });
    it('should display add to cart button when logged in', () => {
        cy.loginFront();
        cy.getbydataCy('product-home-link').first().click();
        cy.getbydataCy('detail-product-add').should('be.visible');
    });
});