import type { KeyboardEvent } from 'react';

export type KeyDefinition = {
    key: string;
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
};

const normalizeDefinition = (
    partial: Partial<KeyDefinition>,
): KeyDefinition => ({
    key: '',
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    ...partial,
});

export const checkKeyDefinitionIsPressed = (
    definition: Partial<KeyDefinition>,
    event: WindowEventMap['keyup'] | WindowEventMap['keydown'] | KeyboardEvent,
    filterOutFormEvents: boolean = true,
): boolean => {
    if (filterOutFormEvents && checkIsFormKeyboardEvent(event)) {
        return false;
    }

    const normalizedDefinition = normalizeDefinition(definition);

    return (
        event.key === normalizedDefinition.key &&
        event.shiftKey === normalizedDefinition.shiftKey &&
        event.ctrlKey === normalizedDefinition.ctrlKey &&
        event.altKey === normalizedDefinition.altKey &&
        event.metaKey === normalizedDefinition.metaKey
    );
};

const checkIsFormKeyboardEvent = (
    event: WindowEventMap['keyup'] | WindowEventMap['keydown'] | KeyboardEvent,
): boolean => {
    const target = event.target;

    return (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
    );
};
