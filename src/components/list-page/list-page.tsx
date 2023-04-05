import React, {ReactElement, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../constants/hooks/useForm";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {LinkedList, ILinkedItem} from "./linked-list";
import {ArrowIcon} from "../ui/icons/arrow-icon";


interface IStatus {
  addHead: boolean,
  addTail: boolean,
  removeHead: boolean,
  removeTail: boolean,
  addByIndex: boolean,
  removeByIndex: boolean,
  indexInProgress: null | number
}

export const ListPage: React.FC = () => {
  const [status, setStatus] = useState<IStatus>({
    addHead: false,
    addTail: false,
    removeHead: false,
    removeTail: false,
    addByIndex: false,
    removeByIndex: false,
    indexInProgress: null
  });

  const initialValue = {value: '', index: 0}
  const {values, handleChange, setValues} = useForm(initialValue);
  const [list, setList] = useState<ILinkedItem[]>([]);

  const linkedList = useMemo(() => {
    const list = new LinkedList<string>();
    const items = ["0", "34", "8", "1"];

    for (let i = 0; i < items.length; i++) {
      list.append(items[i]);
    }

    setList([...list.print()]);
    return list;
  }, []);


  const addToHead = () => {
    setStatus({...status, addHead: true});
    linkedList.insertAt(values.value, 0)

    const head = {
      ...list[0],
      top: (
          <Circle
              letter={values.value}
              state={ElementStates.Changing}
              isSmall={true}
          />
      )
    };

    list.splice(0, 1);
    setList([head, ...list]);

    setTimeout(() => {
      setList([...linkedList.print()])
    }, SHORT_DELAY_IN_MS)

    setTimeout(() => {
      setStatus({...status, addHead: false})
      setValues(initialValue);
    }, SHORT_DELAY_IN_MS * 2)

  }

  const addToTail = () => {
    setStatus({...status, addTail: true})
    linkedList.append(values.value);

    const tail = {
      ...list[list.length - 1],
      bottom: (
          <Circle
              letter={values.value}
              state={ElementStates.Changing}
              isSmall={true}
          />
      )
    };


    list.splice(list.length-1, 1);
    setList([...list, tail]);

    setTimeout(() => {
      setList([...linkedList.print()])
    }, SHORT_DELAY_IN_MS)

    setTimeout(() => {
      setStatus({...status, addTail: false})
      setValues(initialValue);
    }, SHORT_DELAY_IN_MS * 2)
  }

  const deleteFromHead = () => {
    setStatus({...status, removeHead: true});
    linkedList.deleteHead();

    const head = {
      ...list[0],
      bottom: (
          <Circle
              letter={list[0].value}
              state={ElementStates.Changing}
              isSmall={true}
          />
      ),
      value: "",
    };

    list.splice(0, 1);
    setList([head, ...list]);

    setTimeout(() => {
      setList([...linkedList.print()])
      setStatus({...status, removeHead: false})
    }, SHORT_DELAY_IN_MS);

  }

  const deleteFromTail = () => {
    setStatus({...status, removeTail: true})
    linkedList.removeByIndex(list.length-1);

    const tail = {
      ...list[list.length - 1],
      bottom: (
          <Circle
              letter={list[list.length - 1].value}
              state={ElementStates.Changing}
              isSmall={true}
          />
      ),
      value: "",
    };

    list.splice(list.length-1, 1);
    setList([ ...list, tail]);

    setTimeout(()=>{
      setList([...linkedList.print()])
      setStatus({...status, removeTail: false})
    }, SHORT_DELAY_IN_MS);

  }

  const insertAtIndex = () => {
    if (linkedList.getSize() < values.index) {
      return
    }
    linkedList.insertAt(values.value, values.index);

    for (let i = 0; i <= values.index; i++) {
      setTimeout((i) => {
        list[i] = {
          ...list[i],
          top: (
              <Circle
                  letter={values.value}
                  state={ElementStates.Changing}
                  isSmall={true}
              />
          )
        };
        setList([...list])
        setStatus({...status, addByIndex: true, indexInProgress: i});
        }, SHORT_DELAY_IN_MS * i, i)
    }

    setTimeout(() => {
      setList([...linkedList.print()])
      setStatus({...status, addByIndex: false, indexInProgress: values.index});
    }, SHORT_DELAY_IN_MS * (values.index + 1));

    setTimeout(() => {
      setStatus({...status, indexInProgress: null});
      setValues(initialValue);
    }, SHORT_DELAY_IN_MS * (values.index + 2))
  }

  const removeIndex = () => {
    linkedList.removeByIndex(values.index)

    for (let i = 0; i <= values.index; i++) {
      setTimeout((i) => {
        setList([...list])
        setStatus({...status, removeByIndex: true, indexInProgress: i});
      }, SHORT_DELAY_IN_MS * i, i)
    }

    setTimeout(() => {
      list[values.index] = {
        ...list[values.index],
        bottom: (
            <Circle
                letter={list[values.index].value}
                state={ElementStates.Changing}
                isSmall={true}
            />
        ),
        value: ""
      };
      setList([...list])
    }, SHORT_DELAY_IN_MS * (values.index + 1));

    setTimeout(() => {
      setList([...linkedList.print()])
      setStatus({...status, removeByIndex: false});
      setValues(initialValue);
    }, SHORT_DELAY_IN_MS * (values.index + 2));

  }

  const handleCircleStateChange = (index: number, bottom: ReactElement | null, top: ReactElement | null) => {
    if (
        (!bottom && status.addTail && index === list.length-1 ) ||
        (!top && status.addHead && index === 0) ||
        (status.addByIndex  && index === status.indexInProgress)
    ) {
      return ElementStates.Modified

    } else if (status.indexInProgress && (status.addByIndex || status.removeByIndex) && index < status.indexInProgress) {
      return ElementStates.Changing
    } else {
      return ElementStates.Default
    }
  }


  const render = (arr: ILinkedItem[]) => {
    return arr.map(({top, bottom, value, next}, index) =>
        <>
          <Circle
            key={index}
            index={index}
            head={ top ? top : index === 0 ? "head" : ""}
            tail={bottom ? bottom : index === list.length - 1 ? "tail" : ""}
            letter={value}
            state={handleCircleStateChange(index, bottom, top)}
          />
          {next && <ArrowIcon/>}
        </>
    )
  }

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <Input
            onChange={handleChange}
            value={values.value}
            maxLength={4}
            isLimitText={true}
            name='value'
            extraClass={`mr-6 ${styles.input}`}
        />
        <Button
            text="Добавить в head"
            type="button"
            onClick={addToHead}
            isLoader={status.addHead}
            disabled={values.value === '' || Object.values(status).includes(true)}
            extraClass={`mr-6 ${styles.button}`}

        />
        <Button
            text="Добавить в tail"
            type="button"
            onClick={addToTail}
            isLoader={status.addTail}
            disabled={values.value === '' || Object.values(status).includes(true)}
            extraClass={`mr-6 ${styles.button}`}
        />
        <Button
            text="Удалить из head"
            type="button"
            onClick={deleteFromHead}
            isLoader={status.removeHead}
            disabled={list.length < 1 || Object.values(status).includes(true)}
            extraClass={`mr-6 ${styles.button}`}
        />
        <Button
            text="Удалить из tail"
            type="button"
            onClick={deleteFromTail}
            isLoader={status.removeTail}
            disabled={list.length < 1 || Object.values(status).includes(true)}
            extraClass={styles.button}
        />
      </form>

      <form className={styles.form}>
        <Input
            placeholder="Введите индекс"
            type='number'
            max={list.length - 1}
            min={0}
            onChange={handleChange}
            value={values.index}
            name='index'
            extraClass={`mr-6 ${styles.input}`}
        />
        <Button
            text="Добавить по индексу"
            type="button"
            onClick={insertAtIndex}
            isLoader={status.addByIndex}
            disabled={values.value === '' || values.index === null || Object.values(status).includes(true)}
            extraClass={`mr-6 ${styles.button}`}

        />
        <Button
            text="Удалить по индексу"
            type="button"
            onClick={removeIndex}
            isLoader={status.removeByIndex}
            disabled={list.length - 1 < values.index || Object.values(status).includes(true)}
            extraClass={styles.button}
        />
      </form>
      {list && <div className={styles.result}>{render(list)}</div>}

    </SolutionLayout>
  );
};
