type TParam = Array<any> | null | undefined | object | string | number | boolean

function deepEqual(a: TParam, b: TParam): boolean {

    //Both are primitive values
    if (typeof a !== 'object' && typeof b !== 'object') {
        return a === b
    }

    ///One of two primitive values
    if (typeof a !== 'object' || typeof b !== 'object') {
        return false
    }

    //One or both arrays
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) return false;
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if (!deepEqual(a[i], b[i])) return false;
        }

        return true;
    }

    //Both objects
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!b.hasOwnProperty(key)) return false;
        if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
}

type TEqualFunctions = {
    deepEqual: (a: any, b: any) => boolean;
}

const equalFunctions: TEqualFunctions  = {
    deepEqual: deepEqual,
}

export { equalFunctions }

