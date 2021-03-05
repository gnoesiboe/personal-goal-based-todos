export const createDummyArray = (noOfRows: number) => {
    const out = [];

    for (let i = 0; i < noOfRows; i++) {
        out.push(i);
    }

    return out;
};

export const groupItemsWithCallback = <T, I extends string>(
    items: T[],
    callback: (item: T) => string,
): Record<I, T[]> => {
    // @ts-ignore → don't know how to fix this
    const result: Record<I, T[]> = {};

    items.forEach((item) => {
        const key = callback(item) as I;

        if (typeof result[key] === 'undefined') {
            result[key] = [];
        }

        result[key].push(item);
    });

    return result;
};
