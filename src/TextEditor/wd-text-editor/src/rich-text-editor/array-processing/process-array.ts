import { skipUntil, takeUntil } from ".";

const processArray = <T extends Node | Text>(array: T[], startPredicate: (item: T) => boolean, endPredicate: (item: T) => boolean): T[] => {
    const skipped = skipUntil(array, startPredicate);
    const taken = takeUntil(skipped, endPredicate);
    return Array.from(taken);
};

export default processArray;