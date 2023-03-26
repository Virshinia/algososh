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
  loader: boolean;
}



export const SortingPage: React.FC = () => {
  const initialStatus = {loader: false}
  const [array, setValue] = useState<number[]>([]);
  const [status, setStatus] = useState<IStatus>(initialStatus);
  const [sortingSettings, setSettings] = useState({type: 'selection', direction: Direction.Ascending})

  const render = (arr: number[], first?: number, second?: number) => {
    return arr.map((num, i) =>
      <Column
          state={ second ?
              i === first || i === second ? ElementStates.Changing : i > second ? ElementStates.Modified : ElementStates.Default
              : ElementStates.Default}
          index={num}
      />
    )
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
    }

    selectionSort(array, direction)
  }

  const bubbleSort = (arr: number[], direction: string) => {
    for (let i = 0; i < arr.length; i++) {
      for ( let j = 0; j < arr.length - i - 1; j++) {
        setTimeout(() => {
          setStatus({first: j, second: j+1, loader: j !== 0});
          if (direction === Direction.Ascending ? arr[j] > arr[j+1] : arr[j] < arr[j+1]) {
            swap(arr, j, j+1);
            setValue([...arr])
          }

          }, SHORT_DELAY_IN_MS * i )
      }
    }
  }

  const selectionSort = (arr: number[], direction: string) => {
    for (let i = 0; i < arr.length; i++) {
      for ( let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] < arr[j+1]) {
          swap(arr, j, j+1);
          setValue(arr)
        }
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
      {array && <div className={styles.result}>{render(array, status.first, status.second)}</div>}
    </SolutionLayout>
  );
};
