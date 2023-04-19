import {render, screen} from "@testing-library/react";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";
import React from "react";

describe('Circle test', () => {
    it("Circle with letter", () => {
        const circleWithLetter = render(<Circle letter="123" />);
        expect(screen.getByText("123")).toBeInTheDocument();
        expect(circleWithLetter).toMatchSnapshot()
    });

    it("Circle without letter", () => {
        const emptyCircle = render(<Circle />);
        expect(emptyCircle).toMatchSnapshot();
    });

    it("Circle with text in head", () => {
        const circleWithTextInHead = render(<Circle head="head" />);
        expect(screen.getByText("head")).toBeInTheDocument();
        expect(circleWithTextInHead).toMatchSnapshot()
    });

    it("Circle with React element in head", () => {
        const circleWithReactElementInTail = render(<Circle head={<Circle />} />);
        expect(circleWithReactElementInTail).toMatchSnapshot();
    });

    it("Circle with text in tail", () => {
        render(<Circle tail="tail" />);
        expect(screen.getByText("tail")).toBeInTheDocument();
    });

    it("Circle with React element in tail", () => {
        const circleWithReactElementInTail = render(<Circle tail={<Circle />} />);
        expect(circleWithReactElementInTail).toMatchSnapshot();
    });

    it("Circle with index", () => {
        const circleWithIndex = render(<Circle index={4} />);
        expect(circleWithIndex).toMatchSnapshot();
    });

    it("Circle with prop isSmall", () => {
        const smallCircle = render(<Circle isSmall={true} />);
        expect(smallCircle).toMatchSnapshot();
    });

    it("Default state Circle", () => {
        const DefaultCircle = render(<Circle state={ElementStates.Default} />);
        expect(DefaultCircle).toMatchSnapshot();
    });

    it("Changing state Circle", () => {
        const ChangingCircle = render(<Circle state={ElementStates.Default} />);
        expect(ChangingCircle).toMatchSnapshot();
    });

    it("Modified state Circle", () => {
        const ModifiedCircle = render(<Circle state={ElementStates.Default} />);
        expect(ModifiedCircle).toMatchSnapshot();
    });
})

