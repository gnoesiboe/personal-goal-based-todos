export const createDummyArray = (noOfRows: number) => {
    const out = [];

    for (let i = 0; i < noOfRows; i++) {
        out.push(i);
    }

    return out;
};

export const groupItemsWithCallback = <T>(
    items: T[],
    callback: (item: T) => string,
): Record<string, T[]> => {
    const result: Record<string, T[]> = {};

    items.forEach((item) => {
        const key = callback(item);

        if (typeof result[key] === 'undefined') {
            result[key] = [];
        }

        result[key].push(item);
    });

    return result;
};
