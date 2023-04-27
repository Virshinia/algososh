import {MAIN_URL, circle} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";
import {initial, changing} from "../../src/constants/utils";

describe('testing queue page', () => {
  const addToQueueButton = '[data-cy="addToQueueButton"]';
  const removeFromQueueButton = '[data-cy="removeFromQueueButton"]';

  before(() => {
    cy.visit(`${MAIN_URL}/queue`);
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get(addToQueueButton).should('be.disabled');
  })

  it('adding to queue works properly', () => {
    cy.get('input').type('1');
    cy.get(addToQueueButton).click();

    cy.get(circle).eq(0).should('have.css', 'border', changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(0).should('have.css', 'border', initial).should('contain', '1');
    cy.get(circle).eq(0).prev().contains('head');
    cy.get(circle).eq(0).next().next().contains('tail');

    cy.get('input').type('2');
    cy.get(addToQueueButton).click();

    cy.get(circle).eq(1).should('have.css', 'border', changing);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(circle).eq(1).should('have.css', 'border', initial).should('contain', '2');
    cy.get(circle).eq(0).prev().contains('head');
    cy.get(circle).eq(1).next().next().contains('tail');

    cy.get('input').type('3');
    cy.get(addToQueueButton).click();

    cy.get(circle).eq(2).should('have.css', 'border', changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(2).should('have.css', 'border', initial).should('contain', '3');
    cy.get(circle).eq(0).prev().contains('head');
    cy.get(circle).eq(2).next().next().contains('tail');
  })

  it('removing from queue works properly', () => {
    cy.get(removeFromQueueButton).click();

    cy.get(circle).eq(0).should('have.css', 'border', changing);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(0).should('have.css', 'border', initial).should('contain', '');
    cy.get(circle).eq(1).prev().contains('head')
  })

  it('button `Очистить` works properly', () => {
    cy.get('[data-cy="clearQueueButton"]').click();

    cy.get(circle).each((element)=> {
      expect(element).to.contain('').css('border', initial);
      expect(element.prev()).contain('');
      expect(element.next().next()).contain('');
    })

    cy.get(addToQueueButton).should('be.disabled');
    cy.get(removeFromQueueButton).should('be.disabled');
  })
})