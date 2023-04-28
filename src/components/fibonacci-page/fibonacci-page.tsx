import React, {useCallback, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../constants/hooks/useForm";
import {Circle} from "../ui/circle/circle";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const {values, handleChange} = useForm({index: 0})
  const [loader, setLoader] = useState(false);
  const [result, setValue] = useState<number[]>([])

  const submitFibonacci = useCallback((e: React.FormEvent): void => {
    e.preventDefault();
    setValue([]);
    setLoader(true);
    fib(values.index);
    }, [values]
  )


  const render = (arr:number[]) => {
    return arr.map((item, index) =>
        <Circle
            key={index}
            letter={item.toString()}
            index={index}
        />)
  }


  const fib = (n: number) => {
    let arrFib:number[] = [];

    for (let i = 0; i <= n; i++) {
      setTimeout(() => {
        setLoader(i < n);
        if (i <= 1) {
          arrFib[i] = 1;
        } else {
          arrFib[i] = arrFib[i-1] + arrFib[i-2];
        }
        setValue([...arrFib])
      }, SHORT_DELAY_IN_MS * i )
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={submitFibonacci}>
        <Input
            onChange={handleChange}
            placeholder='Введите число'
            max={19}
            value={values.index}
            type='number'
            isLimitText={true}
            name='index'
        />
        <Button
            text="Развернуть"
            type="submit"
            isLoader={loader}
            disabled={loader || Boolean(values.index < 1 || values.index > 19)}
            data-cy="fibButton"
        />
      </form>
      {result && <div className={styles.result}>{render(result)}</div>}
    </SolutionLayout>
  );
};
