import {myFrom, myOf} from "../MyCreationOperators.ts";

const ofMyObservable = myOf(1, 2, 3, 5, 66)
ofMyObservable.subscribe({
    next: (value) => console.log("OF==:", value),
    complete: () => console.log("OF---complete"),
})

const fromMyObservable = myFrom([1, 2, 3, 5, 66])
fromMyObservable.subscribe({
    next: (value) => console.log("FROM==:", value),
    complete: () => console.log("FROM---complete"),
})
