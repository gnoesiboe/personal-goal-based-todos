export const createDummyArray = (noOfRows: number) => {
    const out = [];

    for (let i = 0; i < noOfRows; i++) {
        out.push(i);
    }

    return out;
};
