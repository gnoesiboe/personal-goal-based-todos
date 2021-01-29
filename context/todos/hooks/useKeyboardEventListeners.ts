import { useEffect } from 'react';
import { PostponeTodoToTomorrowHandler } from './useModifyTodoCollection';
import { TodoListItem } from '../../../model/todoListItem';
import { createDateKey } from '../../../utility/dateTimeUtilities';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import { postponeTillTomorrowDefinition } from '../../../constants/keyboardDefinitions';

export default function useKeyboardEventListeners(
    postponeTodoToTomorrow: PostponeTodoToTomorrowHandler,
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
    currentTodoIndex: number,
) {
    useEffect(() => {
        if (!itemsPerDate) {
            return;
        }

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (
                checkKeyDefinitionIsPressed(
                    postponeTillTomorrowDefinition,
                    event,
                )
            ) {
                const itemsForCurrentDate =
                    itemsPerDate[createDateKey(currentDate)] || [];

                const currentTodo = itemsForCurrentDate[currentTodoIndex];

                if (!currentTodo) {
                    return;
                }

                // noinspection JSIgnoredPromiseFromCall
                postponeTodoToTomorrow(currentTodo.id);

                return;
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [itemsPerDate, currentTodoIndex]);
}
