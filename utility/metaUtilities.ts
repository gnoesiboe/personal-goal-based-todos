const baseTitle = 'Goal-based todos';

export const createMetaTitle = (...titles: string[]): string =>
    `${titles.join(' - ')} | ${baseTitle}`;
