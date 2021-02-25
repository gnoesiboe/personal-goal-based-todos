import { KeyDefinition } from '../utility/keyboardUtilities';

export const moveTodoOneDayForwardDefinition: Partial<KeyDefinition> = {
    shiftKey: true,
    ctrlKey: true,
    key: 'ArrowRight',
};

export const moveTodoOneDayBackwardsDefinition: Partial<KeyDefinition> = {
    shiftKey: true,
    ctrlKey: true,
    key: 'ArrowLeft',
};

export const moveToNextDateDefinition: Partial<KeyDefinition> = {
    key: 'ArrowRight',
};

export const moveToPreviousDateDefinition: Partial<KeyDefinition> = {
    key: 'ArrowLeft',
};

export const moveCurrentDateToTodayDefinition: Partial<KeyDefinition> = {
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

export const startEditTodoDefinition: Partial<KeyDefinition> = {
    key: 'e',
};

export const toggleDoneStatusDefinition: Partial<KeyDefinition> = {
    key: ' ',
    ctrlKey: true,
};

export const submitFormDefinition: Partial<KeyDefinition> = {
    key: 'Enter',
    ctrlKey: true,
};

export const removeTodoDefinition: Partial<KeyDefinition> = {
    key: 'Backspace',
    altKey: true,
};

export const resetCurrentTodoDefinition: Partial<KeyDefinition> = {
    key: 'Escape',
};
