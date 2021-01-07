export const createSlug = (value: string): string => {
    return value
        .toLowerCase()
        .replace(/[^\w\d ]+/g, '')
        .replace(/ +/g, '-');
};
