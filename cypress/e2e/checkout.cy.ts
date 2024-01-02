
describe('Checkout Process', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should fill out the checkout form and complete the process', () => {
    // Debugging output
    cy.log('Checking if the email field exists');
    
    // Wait for the email field to appear
    cy.wait(2000);
    
    // Attempt to find and interact with the email field using data-cy attribute
    cy.get('[data-cy=email]').type('user@example.com');

    // ... (rest of your test)
  });
});
