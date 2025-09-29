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
        callback(a * a)
    }, 3000)
}

const promisifyFoo = myPromisify(foo)

foo(2, (val) => {console.log("Ordinary foo:", val)})

promisifyFoo(2)
    .then((value) => console.log(value))
    .catch((error) => console.log(error))
    .finally(() => console.log("Finally"))

export {myPromisify};
