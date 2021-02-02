import { useEffect } from 'react';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import { startEditTodoDefinition } from '../../../constants/keyboardDefinitions';

export default function useShowFormWithKeyboardShortcut(show: () => void) {
    useEffect(() => {
        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkKeyDefinitionIsPressed(startEditTodoDefinition, event)) {
                event.preventDefault();

                show();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);
}
