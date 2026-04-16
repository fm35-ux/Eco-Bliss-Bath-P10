import { fakerFR } from '@faker-js/faker';

describe('API Global Testing', () => {
    const apiUrl = Cypress.env('apiUrl');

    context("Guest Access", () => {

        it('should return 403 when accessing the cart without authentication', () => {
            cy.request({
                method: 'GET',
                url: `${apiUrl}/orders`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(403);
            });
        });

        it('should return 401 for login attempt with unknown user', () => {
            cy.request({
                method: 'POST',
                url: `${apiUrl}/login`,
                failOnStatusCode: false,
                body: {
                    username: "unknown@user.fr",
                    password: "wrongpassword"
                }
            }).then((response) => {
                expect(response.status).to.eq(401);
            });
        });

        it('should return full product specifications for a valid ID', () => {
            const productID = 9;
            cy.request({
                method: 'GET',
                url: `${apiUrl}/products/${productID}`,
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.include.all.keys("id", "name", "availableStock", "skin", "aromas",
                    "ingredients", "description", "price", "picture", "varieties");
                expect(response.body.id).to.eq(productID);
            });
        });
    });

    context('Authenticated User Access', () => {
        let token;

        before(() => {
            cy.loginAPI().then((response) => {
                token = response.body.token;
            });
        });

        it('should confirm valid login returns code 200 and a token', () => {
            cy.loginAPI().then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('token');
            });
        });

        it('should add an available product to the cart', () => {
            cy.request({
                method: 'PUT', //Utilisation de PUT pour correspondre au fonctionnement actuel de l'API (anomalie relevée par Marie)
                url: `${apiUrl}/orders/add`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: {
                    product: 5,
                    quantity: 1
                },
            })
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property("orderLines");
                    const productInCart = response.body.orderLines.find(line => line.product.id === 5);
                    expect(productInCart).to.exist;
                    expect(productInCart.quantity).to.be.at.least(1);
                });
        });


        it('should not add an unavailable product to the cart', () => {
            cy.request({
                method: 'PUT', //Utilisation de PUT pour correspondre au fonctionnement actuel de l'API (anomalie relevée par Marie)
                url: `${apiUrl}/orders/add`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                failOnStatusCode: false,
                body: {
                    product: 4,
                    quantity: 1
                }
            }).then((response) => {
                expect(response.status).not.to.eq(200);
            });
        });

        it('should retrieve the authenticated user s cart content', () => {
            cy.request({
                method: 'GET',
                url: `${apiUrl}/orders`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property("orderLines");
            });
        });
        it('should post a new review for a product', () => {
            const reviewData = {
                title: fakerFR.word.words(3),
                comment: fakerFR.commerce.productDescription(),
                rating: fakerFR.number.int({ min: 1, max: 5 }),
            };
            cy.request({
                method: 'POST',
                url: `${apiUrl}/reviews`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: reviewData,
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.title).to.eq(reviewData.title);
                expect(response.body.comment).to.eq(reviewData.comment);
                expect(response.body.rating).to.eq(reviewData.rating);
            });
        });

    });
});



