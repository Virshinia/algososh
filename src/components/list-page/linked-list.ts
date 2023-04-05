import React from "react";

class Node<T> {
    value: T
    next: Node<T> | null;
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = next === undefined ? null : next;
    }
}

export interface ILinkedItem {
    value: string;
    top: React.ReactElement | null;
    bottom: React.ReactElement | null;
    next: boolean;
}

export interface ILinkedList<T> {
    getElement: (node: Node<T>, index: number) => Node<T>;
    append: (element: T) => void;
    insertAt: (element: T, position: number) => void;
    deleteHead: () => void;
    removeByIndex: (index: number) => void;
    getSize: () => number;
    print: () => void;
}


export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private size: number;

    constructor(initialValues?: T[]) {
        this.head = null;
        this.size = 0;
        if (initialValues) {
            initialValues.forEach((value) => this.append(value));
        }
    }


    getElement(node: Node<T>, index: number): Node<T> {
        if (node.next === null || index === 0) {
            return node
        } else {
            return this.getElement(node.next, index - 1)
        }
    }

    append(element: T) {
        const node = new Node(element);
        if (this.head === null) {
            this.head = node
        } else {
            this.getElement(this.head, this.size).next = node
        }
        this.size++;
    }

    insertAt(element: T, index: number) {

        if (index < 0 || index > this.size) {
            return;
        }

        const node = new Node(element);

        if (index === 0) {
            node.next = this.head;
            this.head = node;
        } else {
            if (this.head) {
                let prev = this.getElement(this.head, index - 1);
                node.next = prev.next
                prev.next = node
            }
        }
        this.size++;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
        }
        this.size--
    }


    removeByIndex(index: number) {
        if (index > 0 && index > this.size) return;

        if (index === 0) {
            this.head = null;
        } else {
            if (this.head) {
                let prev = this.getElement(this.head, index - 1);
                if (prev.next) {
                    prev.next = prev.next.next;
                }
            }
        }
        this.size--;
    }

    getSize() {
        return this.size;
    }

    print() {
        let curr = this.head;
        let res: ILinkedItem[] = [];
        while (curr) {
            res = [
                ...res,
                {
                    value: `${curr.value}`,
                    next: Boolean(curr.next),
                    bottom: null,
                    top: null,
                },
            ];
            curr = curr.next;
        }
        return res;
    }
}
