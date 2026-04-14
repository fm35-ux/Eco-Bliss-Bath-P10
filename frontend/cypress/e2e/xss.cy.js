import { fakerFR } from '@faker-js/faker';

describe('XSS Security Testing', () => {

    it('should not execute a script injected in the review comment field', () => {
        const title = fakerFR.word.words(3);
        const comment = '<script>alert("XSS")</script>';
        const rating = fakerFR.number.int({ min: 1, max: 5 });
        cy.intercept('POST', '**/login').as('POSTlogin');
        cy.loginFront();
        cy.wait('@POSTlogin').then(() => {
            cy.getbySel('nav-link-reviews').click();
            cy.getbySel('review-input-rating-images').click()
                .find('img').eq(rating - 1).click();
            cy.getbySel('review-input-title').type(title);
            cy.getbySel('review-input-comment').type(comment);
            cy.intercept('POST', '**/reviews').as('postReview');
            cy.getbySel('review-submit').click();
            cy.wait('@postReview')
            cy.on('window:alert', () => {
                throw new Error('XSS vulnerability detected: alert was executed');
            });
        });
    });
});

