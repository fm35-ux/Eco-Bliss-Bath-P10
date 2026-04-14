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

Cypress.Commands.add('deleteCart', () => {
    const apiUrl = Cypress.env('apiUrl');

    cy.request({
        method: 'GET',
        url: `${apiUrl}/orders`,
        headers: { Authorization: `Bearer ${Cypress.env('token')}` },
        failOnStatusCode: false
    }).then((response) => {
        if (response.status === 200 && response.body.orderLines?.length > 0) {
            cy.wrap(response.body.orderLines).each((line) => {
                cy.request({
                    method: 'DELETE',
                    url: `${apiUrl}/orders/${line.id}/delete`,
                    headers: { Authorization: `Bearer ${Cypress.env('token')}` },
                    failOnStatusCode: false
                });
            });
        }
    });
});