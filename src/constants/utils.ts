export const swap = (arr: number[] | string [], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

export const TEST_LOCAL_URL = 'http://localhost:3000'