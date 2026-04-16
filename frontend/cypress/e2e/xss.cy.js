import { fakerFR } from '@faker-js/faker';

describe('XSS Security Testing', () => {

    it('should not execute a script injected in the review comment field', () => {
        const title = fakerFR.word.words(3);
        const comment = '<script>alert("XSS")</script>';
        const rating = fakerFR.number.int({ min: 1, max: 5 });
        cy.intercept('POST', '**/login').as('POSTlogin');
        cy.loginFront();
        cy.wait('@POSTlogin').then(() => {
            cy.getbydataCy('nav-link-reviews').click();
            cy.getbydataCy('review-input-rating-images').click()
                .find('img').eq(rating - 1).click();
            cy.getbydataCy('review-input-title').type(title);
            cy.getbydataCy('review-input-comment').type(comment);
            cy.intercept('POST', '**/reviews').as('postReview');
            cy.getbydataCy('review-submit').click();
            cy.wait('@postReview')
            cy.on('window:alert', () => {
                throw new Error('XSS vulnerability detected: alert was executed');
            });
        });
    });
});

