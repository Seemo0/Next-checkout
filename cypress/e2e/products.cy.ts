// cypress/integration/products.spec.ts

describe('Products Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('should render the Products component', () => {
    cy.get('.w-96').should('not.contain', 'isLoading...');

    cy.get('.w-96').should('not.contain', 'Error during fetch , try again');

    cy.get('.w-96').should('contain', 'John Doe\'s Cart');

    cy.get('.w-96').should('contain', '$69.97');

    cy.get('.w-96 .flex.flex-col.space-y-5.py-10.justify-center').should('have.length.greaterThan', 0);
  });
});
