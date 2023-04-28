import {changing, initial, circle} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('testing stack page', () => {
  const addToStackButton = '[data-cy="addToStackButton"]';
  const removeFromStackButton = '[data-cy="removeFromStackButton"]';

  before(() => {
    cy.visit('stack');
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get(addToStackButton).should('be.disabled');
  })

  it('adding to stack works properly', () => {
    cy.get('input').type('1');
    cy.get(addToStackButton).click();

    cy.get(circle).eq(0).should('have.css', 'border', changing).should('contain', '1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).eq(0).should('have.css', 'border', initial).should('contain', '1');

    cy.get('input').type('2');
    cy.get(addToStackButton).click();

    cy.get(circle).eq(0).should('have.css', 'border', initial).should('contain', '1');
    cy.get(circle).eq(1).should('have.css', 'border', changing).should('contain', '2');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).eq(1).should('have.css', 'border', initial).should('contain', '2');
  })

  it('removing from stack works properly', () => {
    cy.get(removeFromStackButton).click();
    cy.get(circle).eq(1).should('have.css', 'border', changing).should('contain', '2');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).should('have.length', 1)

    cy.get(removeFromStackButton).click();
    cy.get(circle).eq(0).should('have.css', 'border', changing).should('contain', '1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).should('have.length', 0)
  })

  it('if stack is empty, removing is disabled', () => {
    cy.get(removeFromStackButton).should('be.disabled');
  })

})