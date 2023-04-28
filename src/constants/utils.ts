export const swap = (arr: number[] | string [], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const MAIN_URL = 'http://localhost:3000';

export const initial = '4px solid rgb(0, 50, 255)';
export const changing = '4px solid rgb(210, 82, 225)';
export const modified = '4px solid rgb(127, 224, 81)';

export const circle = '[data-testid^=circle]';
