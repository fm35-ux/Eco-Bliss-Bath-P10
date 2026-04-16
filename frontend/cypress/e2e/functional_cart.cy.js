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

        it('should add an available product to the cart and update the cart quantity', () => {
            let stockBefore;

            //aller sur la fiche du produit et récupérer le stock avant l'ajout
            cy.intercept('GET', '**/products/5').as('getProduct');
            cy.visit('/#/products/5');
            cy.wait('@getProduct')
                //vérifier et sauvegarder le stock avant l'ajout
                .its('response.body.availableStock')
                .then((stock) => {
                    stockBefore = stock;
                    expect(stockBefore).to.be.greaterThan(0);
                });
            //ajouter le produit au panier
            cy.intercept('GET', '**/orders').as('getCart');
            cy.getbydataCy('detail-product-add').click();
            cy.wait('@getCart')
                .its('response.body.orderLines')
                .then((orderLines) => {
                    const addedProduct = orderLines.find(line => line.product.id === 5);
                    expect(addedProduct).to.exist;
                    expect(addedProduct.quantity).to.eq(1);
                });
            //vérifier la redirection vers le panier
            cy.url().should('include', '/cart');
            cy.getbydataCy('cart-line').should('have.length', 1);
            //retourner sur la fiche du produit et vérifier que le stock a diminué de 1
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
            cy.visit('/#/products/7');
            cy.getbydataCy('detail-product-quantity').clear().type('21');
            cy.getbydataCy('detail-product-form').should('have.class', 'ng-invalid');
            cy.getbydataCy('detail-product-add').click();
            cy.url().should('include', '/products/7');
        });
    });
});



