import React, {useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../queue-page/queue-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useForm} from "../../constants/hooks/useForm";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "./class-stack";

export const StackPage: React.FC = () => {

  const {values, handleChange} = useForm({value: ''})
  const [loader, setLoader] = useState({push: false, pop: false});
  const [array, setStack] = useState<Array<string | number>>([])

  const stack = useMemo(() => {
    return new Stack<string | number >();
  },[])

  const addToStack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoader({...loader, push: true});
    stack.push(values.value);
    setStack([...stack.getStack()]);
    setTimeout(()=>{
      setLoader({...loader, push: false});
    }, SHORT_DELAY_IN_MS)

  }

  const removeFromStack = (e: React.FormEvent) => {

    e.preventDefault();
    setLoader({...loader, pop: true});
    stack.pop();
    setStack([...stack.getStack()]);
    setTimeout(()=>{
      setLoader({...loader, push: false});
    }, SHORT_DELAY_IN_MS)

  }

  const clearStack = () => {
    setStack(stack.clear())
  }


  const render = (arr: Array<string | number>) => {
    const last = arr.length - 1
    return arr.map((value, index) =>
        <Circle
            key={index}
            index={index}
            letter={value ? value.toString() : ''}
            head={ index === last ? 'top' : null}
            state={ index === last && (loader.push || loader.pop) ? ElementStates.Changing : ElementStates.Default}
        />)
  }
  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={addToStack}>
        <Input
            onChange={handleChange}
            value={values.value}
            maxLength={4}
            isLimitText={true}
            name='value'
            extraClass='mr-6'
        />
        <Button
            text="Добавить"
            type="submit"
            isLoader={loader.push}
            disabled={values.value === '' || loader.push || loader.pop}
            extraClass='mr-6'

        />
        <Button
            text="Удалить"
            type="button"
            onClick={removeFromStack}
            isLoader={loader.pop}
            disabled={array.length < 1 || loader.push || loader.pop}
            extraClass='mr-20'
        />
        <Button
            text="Очистить"
            type="button"
            onClick={clearStack}
            disabled={array.length < 1 || loader.push || loader.pop}
            extraClass='ml-20'
        />
      </form>

      {array && <div className={styles.result}>{render(array)}</div>}
    </SolutionLayout>
  );
};
