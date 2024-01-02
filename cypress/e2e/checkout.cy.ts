
describe('Checkout Process', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('successfully loads', () => {
    cy.visit('http://localhost:3000')
  })

  it('should render the Checkout component', () => {
    cy.get('.flex.flex-col.bg-white.shadow-md.rounded-lg.p-2.space-y-4').should('exist');

    cy.get('input[name=email]').type("test@example.com");
    cy.get('input[name=cardNumber]').type("1234 1234 1234 1234");
    cy.get('input[name=expirationDate]').type("1234");
    cy.get('input[name=cvv]').type("123");
    cy.get('[name="cardType"][value="credit"]').check();
    cy.get('[name="cardType"][value="credit"]').should('be.checked');
    cy.get('input[name=name]').type("semo");

    cy.get('button').click();

    cy.get('button').should('have.text', 'Loading...');

    cy.contains('Checkout successful', { timeout: 10000 }).should('exist');

    cy.get('input[name=email]').should('have.value', '');
    cy.get('input[name=cardNumber]').should('have.value', '');
  });


});
