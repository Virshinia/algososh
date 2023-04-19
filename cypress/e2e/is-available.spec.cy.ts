import {TEST_LOCAL_URL} from "../../src/constants/utils";

describe('app is available', () => {
  it(`should be available on ${TEST_LOCAL_URL}`, () => {
    cy.visit(TEST_LOCAL_URL);
  })
})