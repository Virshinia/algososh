import {MAIN_URL} from "../../src/constants/utils";
import {DELAY_IN_MS} from "../../src/constants/delays";
import {initial, changing, modified} from "../../src/constants/utils";

describe('app is available', () => {
  before(() => {
    cy.visit(`${MAIN_URL}/recursion`);
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('[data-cy="reverseButton"]').should('be.disabled');
  })

  it('string reverse works properly', () => {
    cy.get('input').type('hello');
    cy.get('[data-cy="reverseButton"]').click();
    cy.get('[data-cy="reverseButton"]')

    cy.get('[data-testid^=circle]').as(`circles`)

    cy.get('@circles').eq(0).should('have.css', 'border', changing).should('contain', 'o');
    cy.get('@circles').eq(1).should('have.css', 'border', initial).should('contain', 'e');
    cy.get('@circles').eq(2).should('have.css', 'border', initial).should('contain', 'l');
    cy.get('@circles').eq(3).should('have.css', 'border', initial).should('contain', 'l');
    cy.get('@circles').eq(4).should('have.css', 'border', changing).should('contain', 'h');

    cy.wait(DELAY_IN_MS);

    cy.get('@circles').eq(0).should('have.css', 'border', modified).should('contain', 'o');
    cy.get('@circles').eq(1).should('have.css', 'border', changing).should('contain', 'l');
    cy.get('@circles').eq(2).should('have.css', 'border', initial).should('contain', 'l');
    cy.get('@circles').eq(3).should('have.css', 'border', changing).should('contain', 'e');
    cy.get('@circles').eq(4).should('have.css', 'border', modified).should('contain', 'h');

    cy.get('[data-cy="reverseButton"]').should('not.be.disabled');
  })
})