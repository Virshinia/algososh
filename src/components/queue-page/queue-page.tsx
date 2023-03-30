import React, {useCallback, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../constants/hooks/useForm";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import styles from "./queue-page.module.css";
import {usePrevious} from "../../constants/hooks/usePrevious";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

interface IStatus {
    head: number;
    tail: number;
    size: number;
    loaderForEnqueue: boolean;
    loaderForDequeue: boolean;
}

export const QueuePage: React.FC = () => {
    const length = 7
    const initialArray = Array(length).fill(null);
    const initialStatus = {head: 0, tail: 0, size: 0, loaderForEnqueue: false, loaderForDequeue: false};

    const [status, setStatus] = useState<IStatus>(initialStatus);
    const [array, setQueue] = useState(initialArray);

    const {values, handleChange, setValues} = useForm({value : ''});
    const prevStatus = usePrevious(status);

    const enqueue = useCallback((e: React.FormEvent): void => {
        e.preventDefault();
        const changedArr = array;
        setStatus({...status, loaderForEnqueue: true})

        setTimeout(()=> {
            changedArr[status.tail] = values.value;
            setStatus({...status, tail: prevStatus.tail + 1, size: prevStatus.size + 1, loaderForEnqueue: false});
            setQueue([...changedArr]);
        }, SHORT_DELAY_IN_MS)

        setValues({value : ''});
  }, [values]);

  const dequeue = (e: React.FormEvent): void => {
      e.preventDefault();
      const changedArr = array;
      setStatus({...status, loaderForDequeue: true});
      
      setTimeout(()=>{
          changedArr[status.head] = null;
          setStatus({...status, head: prevStatus.head + 1, size: prevStatus.size - 1, loaderForDequeue: false});
          setQueue([...changedArr]);
      }, SHORT_DELAY_IN_MS)
  }

  const clearQueue = () => {
      setQueue(initialArray);
      setStatus(initialStatus)
  }

  const render = (arr:string[], size: number, head: number, tail: number) => {
    return arr.map((value, index) =>
        <Circle
            key={index}
            index={index}
            letter={value ? value : ''}
            state={(index === tail && status.loaderForEnqueue)|| (index === head && status.loaderForDequeue) ? ElementStates.Changing : ElementStates.Default}
            head={ size > 0 && head === index ? 'head' : null}
            tail={ size > 0 && tail - 1 === index ? 'tail' : null}
        />)
  }

  return (
      <SolutionLayout title="Очередь">
        <form className={styles.form} onSubmit={enqueue}>
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
              isLoader={status.loaderForEnqueue}
              disabled={status.tail === array.length || status.loaderForDequeue || status.loaderForEnqueue}
              extraClass='mr-6'

          />
          <Button
              text="Удалить"
              type="button"
              onClick={dequeue}
              isLoader={status.loaderForDequeue}
              disabled={status.size === 0 || status.loaderForDequeue || status.loaderForEnqueue}
              extraClass='mr-20'
          />
            <Button
                text="Очистить"
                type="button"
                onClick={clearQueue}
                disabled={status.loaderForDequeue || status.loaderForEnqueue}
                extraClass='ml-20'
            />
        </form>

        {array && <div className={styles.result}>{render(array, status.size, status.head, status.tail)}</div>}
    </SolutionLayout>
  );
};
