interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    isEmpty: () => boolean;
    getQueue: () => (T | null)[];
    clear: () => void;

}
export class Queue<T> implements IQueue<T>{
    container: (T | null)[] = [];
    head = 0;
    tail = 0;
    readonly size: number = 0;
    length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        this.container[this.head % this.size] = null;
        this.length--;
        this.head++;
    };

    isEmpty = () => this.length === 0;

    getQueue = () => {
        return this.container;
    };
    clear = () => {
        this.container = Array(this.size);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    };
}
