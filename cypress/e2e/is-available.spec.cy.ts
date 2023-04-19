import {TEST_LOCAL_URL} from "../../src/constants/utils";

describe('app is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit(TEST_LOCAL_URL);
  })
})