import React, {FormEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";
import {bubbleSorting, selectionSorting} from "./utils";

interface IStatus {
  first?: number;
  second?: number;
  sorted?: number;
  loader: boolean;
  isFullySorted: boolean;
}



export const SortingPage: React.FC = () => {
  const initialStatus = {loader: false, isFullySorted: false}
  const [array, setValue] = useState<number[]>([]);
  const [status, setStatus] = useState<IStatus>(initialStatus);
  const [sortType, setSettings] = useState('selection')

  const render = (arr: number[], first?: number, second?: number, sorted?: number) => {
    return arr.map((num, i) =>
      <Column
          key={i}
          state={handlerColumnStateChange(i, first, second, sorted)}
          index={num}
      />
    )
  }

  const handlerColumnStateChange = (i: number, first?: number, second?: number, sorted?: number) => {
    if (status.isFullySorted) {
      return ElementStates.Modified
    }

    if (i === first || i === second) {
      return ElementStates.Changing
    } else if (sortType === 'bubble' && sorted && (i > sorted)) {
      return ElementStates.Modified
    } else if (sortType === 'selection' && sorted && (i <= sorted)) {
      return ElementStates.Modified
    } else {
      return ElementStates.Default
    }
  }

  const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;
    let qty = Math.floor(Math.random() * (maxLen - minLen) + minLen);
    let arr = [];
    while (qty > 0) {
      let randomNumber = Math.floor(Math.random() * 100)
      arr.push(randomNumber)
      qty--
    }
    setValue(arr);
    setStatus(initialStatus)
  }

  useEffect(()=> {
    randomArr()
  }, [])


  const handlerRadioInputChange = (event: FormEvent<HTMLInputElement>) => {
    setSettings(event.currentTarget.value)
  }

  const showSortingSteps = (arr: number[], direction: string) => {
    const sortingSteps = (sortType === 'bubble') ? bubbleSorting(arr, direction) : selectionSorting(arr, direction)
    for (let i = 0; i < sortingSteps.length; i++) {
      setTimeout(()=> {
        setStatus({
          first: sortingSteps[i].first,
          second: sortingSteps[i].second,
          sorted: sortingSteps[i].sorted,
          loader: i < sortingSteps.length - 1,
          isFullySorted: sortingSteps.length - i === 1,
        })
        setValue([...sortingSteps[i].currentArray]);
      }, SHORT_DELAY_IN_MS * i)
    }
  }


  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttons}>
        <RadioInput
            name='sortingType'
            label='Выбор'
            extraClass='mr-20'
            value='selection'
            onChange={handlerRadioInputChange}
            checked={sortType === 'selection'}
        />
        <RadioInput
            name='sortingType'
            label='Пузырёк'
            extraClass='mr-20'
            value='bubble'
            onChange={handlerRadioInputChange}
            checked={sortType === 'bubble'}
        />
        <Button
            sorting={Direction.Ascending}
            text='По возрастанию'
            extraClass='ml-8 mr-6'
            disabled={status.loader}
            onClick={()=> showSortingSteps(array, Direction.Ascending)}
        />
        <Button
            sorting={Direction.Descending}
            text='По убыванию'
            extraClass='mr-20'
            disabled={status.loader}
            onClick={()=> showSortingSteps(array, Direction.Descending)}
        />
        <Button
            text='Новый массив'
            extraClass='ml-20'
            disabled={status.loader}
            onClick={()=> randomArr()}
        />
      </div>
      {array && <div className={styles.result}>{render(array, status.first, status.second, status.sorted)}</div>}
    </SolutionLayout>
  );
};
