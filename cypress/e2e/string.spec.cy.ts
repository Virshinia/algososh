import {circle} from "../../src/constants/utils";
import {DELAY_IN_MS} from "../../src/constants/delays";
import {initial, changing, modified} from "../../src/constants/utils";

describe('testing string page', () => {
  const button = '[data-cy="reverseButton"]';

  before(() => {
    cy.visit('recursion');
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get(button).should('be.disabled');
  })

  it('string reverse works properly', () => {
    cy.get('input').type('hello');
    cy.get(button).click();

    cy.get(circle).as(`circles`);

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

    cy.get(button).should('not.be.disabled');
  })
})