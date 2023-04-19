import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Button test", () => {
    it("Button with text", () => {
        render(<Button text="Press the button" />);
        expect(screen.getByText("Press the button")).toBeInTheDocument();
    });

    it("Button without text", () => {
        render(<Button />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Button is disabled", () => {
        const item = render(<Button disabled={true} />);
        expect(item).toMatchSnapshot();
    });

    it("Button with loader", () => {
        const btn = render(<Button isLoader={true} />);
        expect(btn).toMatchSnapshot();
    });

    it("Click on the button", () => {
        const clickOnButton = jest.fn();
        render(<Button text="textButton" onClick={clickOnButton} />);
        fireEvent.click(screen.getByText("textButton"));
        expect(clickOnButton).toHaveBeenCalled();
    });
});
