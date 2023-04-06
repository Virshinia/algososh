import React, {useCallback, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../constants/hooks/useForm";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import styles from "./queue-page.module.css";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Queue} from "./class-queue";


export const QueuePage: React.FC = () => {
    const length = 7
    const [loader, setLoader] = useState({enqueue: false, dequeue: false});
    const [array, setQueue] = useState<Array<string | number | null>>([]);

    const {values, handleChange, setValues} = useForm({value : ''});

    const queue = useMemo(() => {
        return new Queue<string>(length);
    }, [])

    useEffect(() => {
       setQueue([...queue.getQueue()])
    },[queue])

    const enqueue = useCallback((e: React.FormEvent): void => {
        e.preventDefault();
        setLoader({...loader, enqueue: true})

        setTimeout(()=> {
            queue.enqueue(values.value);
            setLoader({...loader, enqueue: false});
            setQueue([...queue.getQueue()]);
        }, SHORT_DELAY_IN_MS)

        setValues({value : ''});
  }, [values]);

  const dequeue = (e: React.FormEvent): void => {
      e.preventDefault();
      setLoader({...loader, dequeue: true});
      
      setTimeout(() => {
          queue.dequeue()
          setLoader({...loader, dequeue: false});
          setQueue([...queue.getQueue()])
      }, SHORT_DELAY_IN_MS)
  }

  const clearQueue = () => {
      queue.clear()
      setQueue([...queue.getQueue()]);
  }

  const render = (arr:Array<string | number | null>) => {
    return arr.map((value, index) =>
        <Circle
            key={index}
            index={index}
            letter={value ? value.toString() : ''}
            state={(index === queue.tail && loader.enqueue) || (index === queue.head && loader.dequeue) ? ElementStates.Changing : ElementStates.Default}
            head={ queue.length > 0 && queue.head === index ? 'head' : null}
            tail={ queue.length > 0 && queue.tail - 1 === index ? 'tail' : null}
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
              isLoader={loader.enqueue}
              disabled={values.value === '' || queue.tail === queue.size || loader.dequeue || loader.enqueue}
              extraClass='mr-6'

          />
          <Button
              text="Удалить"
              type="button"
              onClick={dequeue}
              isLoader={loader.dequeue}
              disabled={queue.length === 0 || loader.dequeue || loader.enqueue}
              extraClass='mr-20'
          />
            <Button
                text="Очистить"
                type="button"
                onClick={clearQueue}
                disabled={queue.length === 0 || loader.dequeue || loader.enqueue}
                extraClass='ml-20'
            />
        </form>

        {array && <div className={styles.result}>{render(array)}</div>}
    </SolutionLayout>
  );
};
