import {MAIN_URL} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('app is available', () => {
  const changing = '4px solid rgb(210, 82, 225)';
  const initial = '4px solid rgb(0, 50, 255)';

  before(() => {
    cy.visit(`${MAIN_URL}/stack`);
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('[data-cy="addToStackButton"]').should('be.disabled');
  })

  it('adding to stack works properly', () => {
    cy.get('input').type('1');
    cy.get('[data-cy="addToStackButton"]').click();

    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', changing).should('contain', '1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', initial).should('contain', '1');

    cy.get('input').type('2');
    cy.get('[data-cy="addToStackButton"]').click();

    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', initial).should('contain', '1');
    cy.get('[data-testid^=circle]').eq(1).should('have.css', 'border', changing).should('contain', '2');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-testid^=circle]').eq(1).should('have.css', 'border', initial).should('contain', '2');
  })

  it('removing from stack works properly', () => {
    cy.get('[data-cy="removeFromStackButton"]').click();
    cy.get('[data-testid^=circle]').eq(1).should('have.css', 'border', changing).should('contain', '2');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-testid^=circle]').should('have.length', 1)

    cy.get('[data-cy="removeFromStackButton"]').click();
    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', changing).should('contain', '1');
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-testid^=circle]').should('have.length', 0)
  })

  it('if stack is empty, removing is disabled', () => {
    cy.get('[data-cy="removeFromStackButton"]').should('be.disabled');
  })

})