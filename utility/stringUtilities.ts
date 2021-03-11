export const createSlug = (value: string): string => {
    return value
        .toLowerCase()
        .replace(/[^\w\d ]+/g, '')
        .replace(/ +/g, '-');
};

export const splitAtLineBreak = (value: string): string[] =>
    value.split(/\r?\n/g);
