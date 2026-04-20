describe('Functional Cart Testing', () => {
    const apiUrl = Cypress.env('apiUrl');

    beforeEach(() => {
        cy.intercept('POST', '**/login').as('POSTlogin');
        cy.loginFront();
        cy.wait('@POSTlogin')
            .its('response.body.token')
            .then((token) => {
                Cypress.env('token', token);
                cy.deleteCart();
            });
    });

    it('should not add an unavailable product to the cart', () => {
        cy.intercept('GET', '**/products/3').as('getProduct');
        cy.visit('/#/products/3');
        cy.wait('@getProduct')
            .its('response.body')
            .then((product) => {
                expect(product.availableStock).to.be.lessThan(1);
            });
        cy.getbydataCy('detail-product-add').click();
        cy.url().should('include', '/products/3');
        cy.intercept('GET', '**/orders').as('getCart');
        cy.visit('/#/cart');
        cy.wait('@getCart');
        cy.getbydataCy('cart-line').should('have.length', 0);
    });

    context('With an available product', () => {

        it('should add a product to the cart and visually update the stock (UI)', () => {
            let stockBefore;

            cy.visit('/#/products/5');
            cy.getbydataCy('detail-product-add').should('exist').and('be.visible');
            cy.getbydataCy('detail-product-stock')
                .should('exist')
                .and('be.visible')
                .should(($el) => {
                    expect($el.text()).to.match(/\d/);
                })
                .invoke('text')
                .then((text) => {
                    stockBefore = parseInt(text);
                    expect(stockBefore).to.be.greaterThan(0);
                });

            cy.getbydataCy('detail-product-add').click();
            cy.url().should('include', '/cart');
            cy.getbydataCy('cart-line').should('exist').and('be.visible');
            cy.getbydataCy('cart-line').should('have.length', 1);

            cy.visit('/#/products/5');
            cy.getbydataCy('detail-product-stock')
                .should('exist')
                .and('be.visible')
                .should(($el) => {
                    expect($el.text()).to.match(/\d/);
                })
                .invoke('text')
                .then((text) => {
                    const stockAfter = parseInt(text);
                    expect(stockAfter).to.eq(stockBefore - 1);
                });
        });

        it('should add a product to the cart and verify cart content and stock with API', () => {
            let stockBefore;

            cy.intercept('GET', '**/products/5').as('getProductBefore');
            cy.visit('/#/products/5');
            cy.getbydataCy('detail-product-add').should('exist').and('be.visible');
            cy.wait('@getProductBefore')
                .its('response.body.availableStock')
                .then((availableStock) => {
                    stockBefore = availableStock;
                    expect(stockBefore).to.be.greaterThan(0);
                });
            cy.intercept('GET', '**/orders').as('getCart');
            cy.getbydataCy('detail-product-add').click();
            cy.url().should('include', '/cart');
            cy.wait('@getCart')
                .its('response.body.orderLines')
                .then((orderLines) => {
                    const addedProduct = orderLines.find(
                        (line) => line.product.id === 5 && line.quantity === 1
                    );
                    expect(addedProduct).to.exist;
                });
            cy.intercept('GET', '**/products/5').as('getProductAfter');
            cy.visit('/#/products/5');
            cy.wait('@getProductAfter')
                .its('response.body.availableStock')
                .then((stockAfter) => {
                    expect(stockAfter).to.eq(stockBefore - 1);
                });
        });

        it('should display the product availability field', () => {
            cy.visit('/#/products/4');
            cy.getbydataCy('detail-product-stock').should('exist').and('be.visible');
        });

        it('should not allow adding a product with a negative quantity to the cart', () => {
            cy.visit('/#/products/6');
            cy.getbydataCy('detail-product-quantity').clear().type('-1');
            cy.getbydataCy('detail-product-form').should('have.class', 'ng-invalid');
            cy.getbydataCy('detail-product-add').click();
            cy.url().should('include', '/products/6');
        });

        it('should not allow adding a product with a quantity greater than 20', () => {
            cy.visit('/#/products/5');
            cy.getbydataCy('detail-product-quantity').clear().type('21');
            cy.getbydataCy('detail-product-form').should('have.class', 'ng-invalid');
            cy.getbydataCy('detail-product-add').click();
            cy.url().should('include', '/products/5');
        });
    });
});



