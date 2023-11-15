const takeUntil = function* <T extends Node | Text>(source: Generator<T, void, undefined>, predicate: (item: T) => boolean): Generator<T, void, undefined> {
    for (const item of source) {
        yield item;
        if (predicate(item)) {
            return;
        }
    }
};

export default takeUntil;