import { useEffect } from 'react';
import {
    checkIsFormKeyboardEvent,
    checkKeyDefinitionIsPressed,
} from '../../../utility/keyboardUtilities';
import { startAddTodoDefinition } from '../../../constants/keyboardDefinitions';

export default function useShowModalWithKeyboardShortcut(show: () => void) {
    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkIsFormKeyboardEvent(event)) {
                return;
            }

            if (checkKeyDefinitionIsPressed(startAddTodoDefinition, event)) {
                event.preventDefault();

                show();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
}
