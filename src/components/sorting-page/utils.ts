import {Direction} from "../../types/direction";
import {swap} from "../../constants/utils";

interface IStep {
    currentArray: number[],
    first?: number,
    second?: number,
    sorted?: number,
    minInd?: number
}

export const bubbleSorting = (arr: number[], direction: string) => {
    let steps: IStep[] = [];
    if (arr.length <= 1) {
        steps.push({currentArray: arr})
    }
    for (let i = 0; i < arr.length - 1; i++) {
        for ( let j = 0; j < arr.length - i; j++) {
            steps.push({currentArray: [...arr], first: j, second: j+1, sorted: arr.length - i - 1})
            if (direction === Direction.Ascending ? arr[j] > arr[j+1] : arr[j] < arr[j+1]) {
                swap(arr, j, j+1);
            }
        }
    }
    return steps
}


export const selectionSorting = (arr: number[], direction: string) => {
    let steps: IStep[] = [];
    if (arr.length <= 1) {
        steps.push({currentArray: arr})
    }
    for (let i = 0; i < arr.length - 1; i++) {
        let minInd = i;
        for ( let j = i + 1; j < arr.length; j++) {
            steps.push({currentArray: [...arr], first: i, second: j, sorted: i})

            if (direction === Direction.Ascending
                ? arr[j] < arr[minInd]
                : arr[j] > arr[minInd]) {
                minInd = j;
            }
        }
        if (minInd !== i) {
            swap(arr, minInd, i);
        }
        steps.push({currentArray: [...arr], sorted: i})
    }
    return steps
};
