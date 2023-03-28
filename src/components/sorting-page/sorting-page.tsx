import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {swap} from "../../constants/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";

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
  const [sortingSettings, setSettings] = useState({type: 'selection'})

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
    } else if (sortingSettings.type === 'bubble' && sorted && (i > sorted)) {
      return ElementStates.Modified
    } else if (sortingSettings.type === 'selection' && sorted && (i <= sorted)) {
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

  const handlerSorting = (direction: string) => {
    if (sortingSettings.type === 'bubble') {
      bubbleSort(array, direction);
    } else {
      selectionSort(array, direction)
    }
  }

  const bubbleSort = (arr: number[], direction: string) => {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
      for ( let j = 0; j < arr.length - i - 1; j++) {
        count++
        setTimeout((i, j, count) => {
          console.log(count)
          setStatus({first: j, second: j+1, sorted: arr.length - i - 1, loader: arr.length - i - 1 > 1, isFullySorted: arr.length - i - 1 === 1 });
          if (direction === Direction.Ascending ? arr[j] > arr[j+1] : arr[j] < arr[j+1]) {
            swap(arr, j, j+1);
            setValue([...arr])
          }
          }, SHORT_DELAY_IN_MS * count, i, j, count)
      }
    }
  }

  const selectionSort = (arr: number[], direction: string) => {
    let count = 0
    for (let i = 0; i < arr.length - 1; i++) {
      for ( let j = i + 1; j < arr.length; j++) {
        count++
        setTimeout((i, j, minInd) => {
          setStatus({first: minInd, second: j, loader: minInd < arr.length - 2, sorted: minInd, isFullySorted: minInd === arr.length - 2});

          if (direction === Direction.Ascending ? arr[j] < arr[minInd] : arr[j] > arr[minInd]) {
            minInd = j
            swap(arr, minInd, i);
            setValue([...arr])
          }

        }, SHORT_DELAY_IN_MS * count, i, j, i, count)

      }
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttons}>
        <RadioInput label='Выбор'
                    extraClass='mr-20'
                    onClick={()=>{setSettings({...sortingSettings, type: 'selection'})}}/>
        <RadioInput label='Пузырёк'
                    extraClass='mr-20'
                    onClick={()=>{setSettings({...sortingSettings, type: 'bubble'})}}/>
        <Button sorting={Direction.Ascending}
                text='По возрастанию'
                extraClass='ml-8 mr-6'
                disabled={status.loader}
                onClick={()=> handlerSorting(Direction.Ascending)}
        />
        <Button sorting={Direction.Descending}
                text='По убыванию'
                extraClass='mr-20'
                disabled={status.loader}
                onClick={()=> handlerSorting(Direction.Descending)}
        />
        <Button text='Новый массив'
                extraClass='ml-20'
                disabled={status.loader}
                onClick={()=> randomArr()}
        />
      </div>
      {array && <div className={styles.result}>{render(array, status.first, status.second, status.sorted)}</div>}
    </SolutionLayout>
  );
};
