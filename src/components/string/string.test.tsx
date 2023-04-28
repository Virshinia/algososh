import { act, fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import {StringComponent} from "./string";


describe('test string reverse', () => {
    function test (value: string, expectation: string) {
       jest.useFakeTimers();

        render(<BrowserRouter><StringComponent /></BrowserRouter>);

        const input = screen.getByRole("textbox");
        const button = screen.getByText("Развернуть");

        fireEvent.change(input, {target: {value: value}});
        fireEvent.click(button);
        act(()=>{
            jest.runAllTimers()
        })

        expect(screen.queryAllByTestId("letter").map(letter => letter.textContent).join('')).toBe(expectation)
    }

    it('reverse string with odd letters', () => {
         test('hello', 'olleh')
    });

    it('reverse string with even letters', () => {
        test('hell', 'lleh')
    });

    it('reverse string with one letter', () => {
        test('h', 'h')
    });

    it('reverse empty string', () => {
        test('', '')
    });
})