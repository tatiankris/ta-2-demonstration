import {MyObservable} from "../MyObservable.ts";

const myObservable = new MyObservable((subscriber) => {
    subscriber.next(3)
    setTimeout(() => {
        subscriber.next(5)
        subscriber.complete()
    }, 2000)
})

myObservable.subscribe((v) => console.log("obsMY-0:", v))
myObservable.subscribe({
    next: (v) => console.log("obsMy--1111", v),
    complete: () => console.log("obsMy--1111--Complete")
})
