import { useEffect, useState } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import {
    resolveNextCurrentTodoIndex,
    resolvePreviousCurrentTodoIndex,
} from '../../../features/todoOverview/utility/currentTodoIndexResolver';
import { createDateKey } from '../../../utility/dateTimeUtilities';
import { checkKeyDefinitionIsPressed } from '../../../utility/keyboardUtilities';
import {
    moveToNextTodoDefinition,
    moveToPreviousTodoDefinition,
} from '../../../constants/keyboardDefinitions';

export type SetCurrentTodoIndexHandler = (index: number) => void;

export type CurrentTodoIndexState = number | null;

export default function useManageCurrentTodo(
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
) {
    const [
        currentTodoIndex,
        setCurrentTodoIndexState,
    ] = useState<CurrentTodoIndexState>(null);

    useEffect(() => {
        setCurrentTodoIndexState(null);
    }, [currentDate]);

    useEffect(() => {
        const moveToNext = () => {
            setCurrentTodoIndexState((currentTodoIndex) => {
                return resolveNextCurrentTodoIndex(
                    itemsPerDate,
                    currentDate,
                    currentTodoIndex,
                );
            });
        };

        const moveToPrevious = () => {
            setCurrentTodoIndexState((currentTodoIndex) => {
                return resolvePreviousCurrentTodoIndex(
                    itemsPerDate,
                    currentDate,
                    currentTodoIndex,
                );
            });
        };

        const onKeyDown = (event: WindowEventMap['keydown']) => {
            if (checkKeyDefinitionIsPressed(moveToNextTodoDefinition, event)) {
                moveToNext();
            } else if (
                checkKeyDefinitionIsPressed(moveToPreviousTodoDefinition, event)
            ) {
                moveToPrevious();
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [itemsPerDate, currentDate]);

    const setCurrentTodoIndex: SetCurrentTodoIndexHandler = (index) => {
        const items = itemsPerDate[createDateKey(currentDate)] || [];

        const indexExists = typeof items[index] !== 'undefined';

        if (!indexExists) {
            return;
        }

        setCurrentTodoIndexState(index);
    };

    const resetCurrentTodoIndex = () => setCurrentTodoIndexState(null);

    return { currentTodoIndex, setCurrentTodoIndex, resetCurrentTodoIndex };
}
