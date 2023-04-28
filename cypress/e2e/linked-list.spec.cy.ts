import {changing, initial, modified, circle} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('testing linked-list page', () => {
  const inputNameValue = 'input[name="value"]';
  const inputNameIndex = 'input[name="index"]';
  const addToHeadButton = '[data-cy="addToHead"]';
  const addToTailButton = '[data-cy="addToTail"]';
  const addByIndexButton = '[data-cy="addByIndex"]';

  before(() => {
    cy.visit('list');
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get(addToHeadButton).should('be.disabled');
    cy.get(addToTailButton).should('be.disabled');
    cy.get(addByIndexButton).should('be.disabled');
  })

  it('add to tail', () => {
    cy.get(inputNameValue).type('tail');
    cy.get(addToTailButton).click();

    cy.get(circle).last()
        .should('have.css', 'border', changing)
        .should('contain', 'tail')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).last()
        .should('have.css', 'border', modified)
        .should('contain', 'tail')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).last()
        .should('have.css', 'border', initial)
  })

  it('add to head', ()=>{
    cy.get(inputNameValue).type('head');
    cy.get(addToHeadButton).click();

    cy.get(circle).first()
        .should('have.css', 'border', changing)
        .should('contain', 'head')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).first()
        .should('have.css', 'border', modified)
        .should('contain', 'head')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).first()
        .should('have.css', 'border', initial)
  })

  it('remove from tail', () => {
    cy.get('[data-cy="deleteFromTail"]').click();
    cy.get(circle).last()
        .should('have.css', 'border', changing)
        .should('have.text', 'tail')

    cy.get(circle).last().prev()
        .should('have.text', '')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).last()
        .should('have.css', 'border', initial)
        .should('have.text', '1')
  })


  it('remove from head', () => {
    cy.get('[data-cy="deleteFromHead"]').click();
    cy.get(circle).eq(1)
        .should('have.css', 'border', changing)
        .should('have.text', 'head')

    cy.get(circle).first()
        .should('have.text', '')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).first()
        .should('have.css', 'border', initial)
        .should('have.text', '0')
  })

  it('add by index', () => {
    cy.get(inputNameValue).type('new');
    cy.get(inputNameIndex).type('2');
    cy.get(addByIndexButton).click();

    cy.get(circle).eq(0)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(0)
        .should('have.css', 'border', changing)
    cy.get(circle).eq(1)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(0)
        .should('have.css', 'border', changing)
    cy.get(circle).eq(1)
        .should('have.css', 'border', changing)
    cy.get(circle).eq(2)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(0)
        .should('have.css', 'border', initial)
    cy.get(circle).eq(1)
        .should('have.css', 'border', initial)
    cy.get(circle).eq(2)
        .should('have.css', 'border', modified)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(2)
        .should('have.css', 'border', initial)
        .should('have.text', 'new')
  })

  it('remove by index', () => {
    cy.get(inputNameIndex).type('2');
    cy.get('[data-cy="removeByIndex"]').click();

    cy.get(circle).eq(0)
        .should('have.css', 'border', changing)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(1)
        .should('have.css', 'border', changing)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(2)
        .should('have.css', 'border', initial)
        .should('have.text', '')

    cy.get(circle).eq(3)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circle).eq(2)
        .should('have.css', 'border', initial)
        .should('have.text', '8')
  })
})