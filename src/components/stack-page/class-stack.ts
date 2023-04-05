interface IStack<T> {
    push: (item: T) => void;
    pop: () => T | undefined;
    getStack: () => void;
    clear: () => void;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): T | undefined => {
        return this.container.pop()
    };

    getStack = (): Array<T> => {
        return this.container;
    };

    clear = () => this.container = [];
}
