/// <reference types="cypress" />

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

Cypress.Commands.add('loginAPI', () => {
    return cy.fixture('user').then((user) => {
        return cy.request({
            method: 'POST',
            url: `${Cypress.env('apiUrl')}/login`,
            body: {
                username: user.email,
                password: user.password
            }
        }).then((response) => {
            Cypress.env('token', response.body.token);
            return response;
        });
    });
});