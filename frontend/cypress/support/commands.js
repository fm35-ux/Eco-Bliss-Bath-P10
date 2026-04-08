
Cypress.Commands.add('loginFront', () => {
    cy.visit('/#/login');
    cy.fixture('user').then((user) => {
        cy.get('[data-cy="login-input-username"]').type(user.email);
        cy.get('[data-cy="login-input-password"]').type(user.password);
        cy.get('[data-cy="login-submit"]').click();
    });
});

Cypress.Commands.add("getbySel", (selector) => {
    return cy.get(`[data-cy=${selector}]`);
});

