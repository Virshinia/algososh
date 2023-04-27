import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {circle} from "../../src/constants/utils";

describe('testing fibonacci page', () => {
  const button = '[data-cy="fibButton"]';

  before(() => {
    cy.visit('fibonacci');
  });

  it('if input is empty or value = 0, button is disabled', () => {
    cy.get('input').should('have.value', '0');
    cy.get(button).should('be.disabled');
    cy.get('input').clear();
    cy.get(button).should('be.disabled');
  })

  it('function works properly', () => {
    const fibonacciNumbers = [1, 1, 2, 3, 5];
    cy.get('input').type('4');
    cy.get(button).click();

    cy.wait(SHORT_DELAY_IN_MS * 4);

    cy.get(circle).each(($el, index) => {
      expect($el).to.contain(fibonacciNumbers[index])
    })
  })
})