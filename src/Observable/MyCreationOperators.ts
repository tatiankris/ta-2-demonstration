import {MyObservable} from "./MyObservable.ts"

//////OF
function myOf<T> (...args: T[]) {
    return new MyObservable((subscriber) => {
        for (const arg of args) {
            subscriber.next(arg)
        }
        subscriber.complete()
    })
}

///FROM
function myFrom<T> (args: T[]) {
    return new MyObservable((subscriber) => {
        for (const arg of args) {
            subscriber.next(arg)
        }
        subscriber.complete()
    })
}

export {myOf, myFrom};
