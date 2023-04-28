import {bubbleSorting, selectionSorting} from "./utils";
import {Direction} from "../../types/direction";

describe('test sorting page', () => {
    function test (value: number[], expectation: number[], type: string, direction: string) {
        const arr = (type === 'bubble') ? bubbleSorting(value, direction) : selectionSorting(value, direction)
        const lastStep = arr.at(-1);
        expect(lastStep?.currentArray).toEqual(expectation)
    }

    it ('bubble sorting with empty array', () => {
        test([], [], 'bubble', Direction.Ascending)
    })

    it ('bubble sorting with one element in array', () => {
        test([1], [1], 'bubble', Direction.Ascending)
    })

    it ('bubble sorting with few elements', () => {
        test([1,2,7,-4,5], [-4, 1, 2, 5, 7], 'bubble', Direction.Ascending)

    })

    it ('selection sorting with empty array', () => {
        test([], [], 'selection', Direction.Ascending)
    })

    it ('selection sorting with one element in array', () => {
        test([1], [1], 'selection', Direction.Ascending)
    })


    it ('selection sorting with few elements', () => {
        test([8, 7, -4], [-4, 7, 8], 'selection', Direction.Ascending)
    })
})