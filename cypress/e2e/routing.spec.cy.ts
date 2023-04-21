import {MAIN_URL} from "../../src/constants/utils";

function routing (text: string, url: string, title: string) {
  it (text, () => {
    cy.get(`a[href*='${url}']`).click()
    cy.contains(title)
    cy.get('button').contains('К оглавлению').click()
  })
}
describe('app is available', () => {

  before(() => {
    cy.visit(MAIN_URL);
  });

  routing('should open string page', 'recursion', 'Строка');
  routing('should open fibonacci page', 'fibonacci', 'Последовательность Фибоначчи')
  routing('should open sorting page', 'sorting', 'Сортировка массива')
  routing('should open stack page', 'stack', 'Стек')
  routing('should open queue page', 'queue', 'Очередь')
  routing('should open linked-list page', 'list', 'Связный список')



})