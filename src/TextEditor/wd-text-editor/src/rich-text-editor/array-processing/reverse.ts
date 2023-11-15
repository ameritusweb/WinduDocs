const reverse = function* <T>(array: T[]): Generator<T, void, undefined> {
    for (let i = array.length - 1; i >= 0; i--) {
        yield array[i];
    }
};

export default reverse;