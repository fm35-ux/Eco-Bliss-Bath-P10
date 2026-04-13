describe('Functional Login Testing', () => {
    it('should log in successfully and display the cart button', () => {
        cy.loginFront();
        cy.getbySel('nav-link-cart').should('be.visible');
        cy.getbySel('nav-link-logout').should('be.visible');
    });
});