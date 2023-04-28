import {swap} from "./utils";

describe('test swap function', () => {
    it ('swap first and last elements in an array', () => {
        const arr = [1, 2, 3, 4, 5]
        const swappedArray = [5, 2, 3, 4, 1]
        swap(arr, 0, arr.length-1);
        expect(arr).toEqual(swappedArray)
    })

    it ('swap first and second elements in an array', () => {
        const arr = [1, 2, 3, 4, 5]
        const swappedArray = [2, 1, 3, 4, 5]
        swap(arr, 0, 1);
        expect(arr).toEqual(swappedArray)
    })
})