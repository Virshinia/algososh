import React, { useCallback, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../constants/hooks/useForm";
import { swap } from "../../constants/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

interface IStatus {
    start: number,
    end: number,
    loader: boolean
}

export const StringComponent: React.FC = () => {
    const {values, handleChange} = useForm({string: ''})
    const [array, setValue] = useState<string[] | null>(null);
    const [status, setStatus] = useState<IStatus>({start: 0 ,end: -1, loader: false})

    const submitString = useCallback((e: React.FormEvent): void => {
        e.preventDefault();
        const splitArray = values.string.split('');
        setValue(splitArray)
        reverse(splitArray);
        }, [values]
    )

    const render = (arr:string[], start: number, end: number) => {
        return arr.map((char, index) =>
            <Circle
                key={index}
                letter={char}
                state={index === start || index === end ?
                    ElementStates.Changing : index < start || index > end ?
                    ElementStates.Modified : ElementStates.Default}
            />)
    }

    function reverse (arr: string[]) {
        let start = 0;
        let end = arr.length - 1;
        while (start < end) {
            setTimeout((currentStart, currentEnd) => {
                setStatus({start: currentStart, end: currentEnd, loader: currentStart < currentEnd - 2});
                if (arr[currentStart] !== arr[currentEnd]) {
                    swap(arr, currentStart, currentEnd);
                }
                setValue([...arr])
            }, DELAY_IN_MS * start, start, end)
            start++;
            end--;
        }
    }


  return (
    <SolutionLayout title="Строка">
        <form className={styles.form} onSubmit={submitString}>
            <Input
                onChange={handleChange}
                maxLength={11}
                isLimitText={true}
                name='string'
                value={values.string}
            />
            <Button
                text="Развернуть"
                type="submit"
                isLoader={status.loader}
                disabled={values.string ==='' || status.loader}
            />
        </form>
        {array && <div className={styles.result}>{render(array, status.start, status.end)}</div>}
    </SolutionLayout>
  );
};
