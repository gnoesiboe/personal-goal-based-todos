import { KeyDefinition } from '../utility/keyboardUtilities';

export const postponeTillTomorrowDefinition: Partial<KeyDefinition> = {
    altKey: true,
    key: 'ArrowRight',
};

export const moveToNextDateDefinition: Partial<KeyDefinition> = {
    key: 'ArrowRight',
};

export const moveToPreviousDateDefinition: Partial<KeyDefinition> = {
    key: 'ArrowLeft',
};

export const moveToTodayDefinition: Partial<KeyDefinition> = {
    key: 't',
};

export const moveToNextTodoDefinition: Partial<KeyDefinition> = {
    key: 'ArrowDown',
};

export const moveToPreviousTodoDefinition: Partial<KeyDefinition> = {
    key: 'ArrowUp',
};

export const startAddTodoDefinition: Partial<KeyDefinition> = {
    key: 'a',
};

export const toggleDoneStatusDefinition: Partial<KeyDefinition> = {
    key: ' ',
    ctrlKey: true,
};
