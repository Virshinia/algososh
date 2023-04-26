import {MAIN_URL, changing, initial, modified} from "../../src/constants/utils";
import {SHORT_DELAY_IN_MS} from "../../src/constants/delays";

describe('app is available', () => {

  before(() => {
    cy.visit(`${MAIN_URL}/list`);
  });

  it('if input is empty, button is disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('[data-cy="addToHead"]').should('be.disabled');
    cy.get('[data-cy="addToTail"]').should('be.disabled');
    cy.get('[data-cy="addByIndex"]').should('be.disabled');
  })

  it('add to tail', () => {
    cy.get('input[name="value"]').type('tail');
    cy.get('[data-cy="addToTail"]').click();

    cy.get('[data-testid^=circle]').last()
        .should('have.css', 'border', changing)
        .should('contain', 'tail')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').last()
        .should('have.css', 'border', modified)
        .should('contain', 'tail')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').last()
        .should('have.css', 'border', initial)
  })

  it('add to head', ()=>{
    cy.get('input[name="value"]').type('head');
    cy.get('[data-cy="addToHead"]').click();

    cy.get('[data-testid^=circle]').first()
        .should('have.css', 'border', changing)
        .should('contain', 'head')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').first()
        .should('have.css', 'border', modified)
        .should('contain', 'head')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').first()
        .should('have.css', 'border', initial)
  })

  it('remove from tail', () => {
    cy.get('[data-cy="deleteFromTail"]').click();
    cy.get('[data-testid^=circle]').last()
        .should('have.css', 'border', changing)
        .should('have.text', 'tail')

    cy.get('[data-testid^=circle]').last().prev()
        .should('have.text', '')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').last()
        .should('have.css', 'border', initial)
        .should('have.text', '1')
  })


  it('remove from head', () => {
    cy.get('[data-cy="deleteFromHead"]').click();
    cy.get('[data-testid^=circle]').eq(1)
        .should('have.css', 'border', changing)
        .should('have.text', 'head')

    cy.get('[data-testid^=circle]').first()
        .should('have.text', '')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').first()
        .should('have.css', 'border', initial)
        .should('have.text', '0')
  })

  it('add by index', () => {
    cy.get('input[name="value"]').type('new');
    cy.get('input[name="index"]').type('2');
    cy.get('[data-cy="addByIndex"]').click();

    cy.get('[data-testid^=circle]').eq(0)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(0)
        .should('have.css', 'border', changing)
    cy.get('[data-testid^=circle]').eq(1)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(0)
        .should('have.css', 'border', changing)
    cy.get('[data-testid^=circle]').eq(1)
        .should('have.css', 'border', changing)
    cy.get('[data-testid^=circle]').eq(2)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(0)
        .should('have.css', 'border', initial)
    cy.get('[data-testid^=circle]').eq(1)
        .should('have.css', 'border', initial)
    cy.get('[data-testid^=circle]').eq(2)
        .should('have.css', 'border', modified)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(2)
        .should('have.css', 'border', initial)
        .should('have.text', 'new')
  })

  it('remove by index', () => {
    cy.get('input[name="index"]').type('2');
    cy.get('[data-cy="removeByIndex"]').click();

    cy.get('[data-testid^=circle]').eq(0)
        .should('have.css', 'border', changing)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(1)
        .should('have.css', 'border', changing)

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(2)
        .should('have.css', 'border', initial)
        .should('have.text', '')

    cy.get('[data-testid^=circle]').eq(3)
        .should('have.css', 'border', changing)
        .should('have.text', 'new')

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-testid^=circle]').eq(2)
        .should('have.css', 'border', initial)
        .should('have.text', '8')
  })
})