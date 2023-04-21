import {MAIN_URL} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('app is available', () => {
  before(() => {
    cy.visit(`${MAIN_URL}/fibonacci`);
  });

  it('if input is empty or value = 0, button is disabled', () => {
    cy.get('input').should('have.value', '0');
    cy.get('[data-cy="fibButton"]').should('be.disabled');
    cy.get('input').clear();
    cy.get('[data-cy="fibButton"]').should('be.disabled');
  })

  it('function works properly', () => {
    const fibonacciNumbers = [1, 1, 2, 3, 5];
    cy.get('input').type('4');
    cy.get('[data-cy="fibButton"]').click();

    cy.wait(SHORT_DELAY_IN_MS * 4);

    cy.get('[data-testid^=circle]').each(($el, index) => {
      expect($el).to.contain(fibonacciNumbers[index])
    })
  })
})