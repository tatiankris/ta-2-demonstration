import {MyObservable} from "../MyObservable.ts";

const myObservable = new MyObservable((subscriber) => {
    // subscriber.next(3)
    // setTimeout(() => {
    //     subscriber.next(5)
    //     subscriber.complete()
    // }, 2000)

    subscriber.next(1)
    subscriber.next(2)
    subscriber.complete()
    subscriber.error("ERROR---")
    subscriber.next(3)
})

// myObservable.subscribe((v) => console.log("obsMY-0:", v))
myObservable.subscribe({
    next: (v) => console.log("obsMy--1111", v),
    // complete: () => console.log("obsMy--1111--Complete"),
    // error: (error) => console.log(error)
})
