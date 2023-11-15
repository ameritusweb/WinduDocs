const skipUntil = function* <T extends Node | Text>(array: T[], predicate: (item: T) => boolean): Generator<T, void, undefined> {
    let skip = true;
    for (const item of array) {
        if (skip && predicate(item)) {
            skip = false;
        }
        if (!skip) {
            yield item;
        }
    }
};

export default skipUntil;