import {memoize} from "./Memoize.ts";

const foo = (a: Array<number>, b: number) => {
    return a.filter((it) => it % b === 0)
}

//Ex--1
//1
// const memoizedFoo = memoize(foo)
//2
// const memoizedFoo = memoize(foo, { paramsEqual: "deepEqual" })
//3
// const memoizedFoo = memoize(foo, { resultEqual: "deepEqual" })
//4
const memoizedFoo = memoize(foo, { paramsEqual: "deepEqual", resultEqual: "deepEqual" })

const res1 = memoizedFoo([2, 4, 6, 8, 12], 2)
const res2 = memoizedFoo([2, 4, 6, 8, 12], 2)
//
// console.log("res1:", res1)
// console.log("res2:", res2)
// console.log("equality:", res1 === res2)


//Ex--2
const memoizedFoo2 = memoize(foo)
const arr = [2, 4, 6, 8, 12]

const res21 = memoizedFoo2(arr, 2)
const res22 = memoizedFoo2(arr, 2)

console.log("res21:", res21)
console.log("res22:", res22)
console.log("equality:", res21 === res22)

// const res3 = memoizedFoo([3, 6, 9, 12, 18], 3)

