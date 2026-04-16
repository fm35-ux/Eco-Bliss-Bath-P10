describe('Functional Login Testing', () => {
    it('should log in successfully and display the cart button', () => {
        cy.loginFront();
        cy.getbydataCy('nav-link-cart').should('be.visible');
        cy.getbydataCy('nav-link-logout').should('be.visible');
    });
});