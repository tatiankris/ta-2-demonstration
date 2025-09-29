import {MyObservable} from "./MyObservable.ts";

function myInterval<T> (delay: number) {
    return new MyObservable((subscriber) => {
        let i = 0
        const idInterval = setInterval(() => {
            subscriber.next(i++)
        }, delay)

        return () => {
            clearInterval(idInterval)
        }
    })
}

export {myInterval}
