import {MAIN_URL} from "../../src/constants/utils";

describe('app is available', () => {
  it(`should be available on ${MAIN_URL}`, () => {
    cy.visit('/');
  })
})