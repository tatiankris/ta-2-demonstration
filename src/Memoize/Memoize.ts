import {equalFunctions} from "./EqualFunctions.ts";

type TOptions = {
    paramsEqual?: "deepEqual";
    resultEqual?: "deepEqual";
}

const memoize = <P extends any[], R>(foo: (...args: P) => R, options?: TOptions): typeof foo => {
    let cache = null
    let cacheParams = []

    return function (...args): R {
        const { paramsEqual, resultEqual } = options || {};

        const hasCache = cache !== null;

        if (hasCache) {

            const isParamsEqual = paramsEqual
                ? equalFunctions[paramsEqual](cacheParams, args) // If "paramsEqual" in options
                : cacheParams?.every((val, i) => val === args[i]) && cacheParams.length === args.length // Default - Shallow equal

            ///If isParamsEqual - true and options not includes "resultEqual"
            if (isParamsEqual && !resultEqual) {
                return cache;
            }

            //If "resultEqual" in options
            if (resultEqual) {
                const newResult = foo(...args)
                const isResultEqual = equalFunctions[resultEqual](cache, newResult)

                ///If params Equal - default and isResultEqual - true
                if (!paramsEqual && isResultEqual) {
                    return cache;
                }

                ///If isParamsEqual("deep") - true and isResultEqual - true
                if (isParamsEqual && isResultEqual) {
                    return cache;
                }
            }
        }

        cacheParams = args
        cache = foo(...args)

        return cache;
    };
}

export { memoize };
