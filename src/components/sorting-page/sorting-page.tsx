import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import styles from "./sorting-page.module.css";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {swap} from "../../constants/utils";

export const SortingPage: React.FC = () => {
  const [array, setValue] = useState<number[]>([20,5,10]);
  const [sortingSettings, setSettings] = useState({type: 'selection', direction: Direction.Ascending})
  const render = (arr: number[]) => {
    return arr.map((value) =>
      <Column
          index={value}
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
    setValue(arr)
  }

  useEffect(()=> {
    randomArr()
  }, [])
  const bubbleSort = (arr: number[]) => {
    for (let i = 0; i < arr.length; i++) {
      for ( let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] < arr[j+1]) {
          swap(arr, j, j+1);
          console.log(arr)
        }
      }
    }

  }

  const selectionSort = (arr: number[]) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for ( let j = 0; j < length - i - 1; j++) {
        if (arr[j] < arr[j+1]) {
          swap(arr, j, j+1);
          console.log(arr)
        }
      }
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.buttons}>
        <RadioInput label='Выбор' extraClass='mr-20'
                    onClick={()=>{setSettings({...sortingSettings, type: 'selection'})}}/>
        <RadioInput label='Пузырёк' extraClass='mr-20'
                      onClick={()=>{setSettings({...sortingSettings, type: 'bubble'})}}/>
        <Button sorting={Direction.Ascending} text='По возрастанию' extraClass='ml-8 mr-6'
                onClick={()=>{setSettings({...sortingSettings, direction: Direction.Ascending})}}/>
        <Button sorting={Direction.Descending} text='По убыванию' extraClass='mr-20'
                onClick={()=>{setSettings({...sortingSettings, direction: Direction.Descending})}}/>
        <Button text='Новый массив' extraClass='ml-20'
                onClick={()=> randomArr()}/>
      </div>
      {array && <div className={styles.result}>{render(array)}</div>}
    </SolutionLayout>
  );
};
