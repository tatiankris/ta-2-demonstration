function myPromisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
    };
}

const foo = (a: number, callback) => {
    setTimeout(() => {
        if (a > 1000) {
            callback("Argument can't be more, than 1000")
        }
        callback(null, a * a)
    }, 3000)
}

const promisifyFoo = myPromisify(foo)

foo(2, (val) => {console.log("Ordinary foo:", val)})

promisifyFoo(2)
    .then((value) => console.log("Success:", value))
    .catch((error) => console.log("Error:", error))
    .finally(() => console.log("Finally"))

promisifyFoo(1004)
    .then((value) => console.log("Success:", value))
    .catch((error) => console.log("Error:", error))
    .finally(() => console.log("Finally"))

export {myPromisify};
