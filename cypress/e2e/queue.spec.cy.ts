import {MAIN_URL} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('app is available', () => {
  before(() => {
    cy.visit(`${MAIN_URL}/queue`);
  });

  const changing = '4px solid rgb(210, 82, 225)';
  const initial = '4px solid rgb(0, 50, 255)';

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('[data-cy="addToQueueButton"]').should('be.disabled');
  })

  it('adding to queue works properly', () => {
    cy.get('input').type('1');
    cy.get('[data-cy="addToQueueButton"]').click();

    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', initial).should('contain', '1');
    cy.get('[data-testid^=circle]').eq(0).prev().contains('head');
    cy.get('[data-testid^=circle]').eq(0).next().next().contains('tail');

    cy.get('input').type('2');
    cy.get('[data-cy="addToQueueButton"]').click();

    cy.get('[data-testid^=circle]').eq(1).should('have.css', 'border', changing);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-testid^=circle]').eq(1).should('have.css', 'border', initial).should('contain', '2');
    cy.get('[data-testid^=circle]').eq(0).prev().contains('head');
    cy.get('[data-testid^=circle]').eq(1).next().next().contains('tail');

    cy.get('input').type('3');
    cy.get('[data-cy="addToQueueButton"]').click();

    cy.get('[data-testid^=circle]').eq(2).should('have.css', 'border', changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(2).should('have.css', 'border', initial).should('contain', '3');
    cy.get('[data-testid^=circle]').eq(0).prev().contains('head');
    cy.get('[data-testid^=circle]').eq(2).next().next().contains('tail');

  })

  it('removing from queue works properly', () => {
    cy.get('[data-cy="removeFromQueueButton"]').click();

    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(0).should('have.css', 'border', initial).should('contain', '');
    cy.get('[data-testid^=circle]').eq(1).prev().contains('head')
  })

  it('button `Очистить` works properly', () => {
    cy.get('[data-cy="clearQueueButton"]').click();

    cy.get('[data-testid^=circle]').each((element)=> {
      expect(element).to.contain('').css('border', initial);
      expect(element.prev()).contain('');
      expect(element.next().next()).contain('');
    })

    cy.get('[data-cy="addToQueueButton"]').should('be.disabled');
    cy.get('[data-cy="removeFromQueueButton"]').should('be.disabled');
  })

})