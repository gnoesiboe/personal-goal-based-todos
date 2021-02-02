import { v4 as uuidv4 } from 'uuid';

const compositionDivider = '__';

export const generateId = (): string => uuidv4();

export const generateComposedKey = (...parts: string[]): string =>
    parts.join(compositionDivider);

export const splitComposedKey = (composedKey: string): string[] =>
    composedKey.split(compositionDivider);
