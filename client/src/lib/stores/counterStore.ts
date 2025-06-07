//import {action, makeObservable, observable} from 'mobx';
import {makeAutoObservable} from 'mobx';

export default class CounterStore {
    title = 'Counter Store';
    count = 42;
    event: string[] = [
        `Initial count is ${this.count}`,
    ];

    constructor() {
        //makeObservable(this, {title: observable, count: observable, increment: action, decrement: action});
        makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.event.push(`Incremented by ${amount}, count is now ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.event.push(`Decremented by ${amount}, count is now ${this.count}`);
    }

    get eventsCount() {
        return this.event.length;
    }

}