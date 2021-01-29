import { useEffect, useState } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import {
    resolveNextCurrentTodoIndex,
    resolvePossibleSameTodoIndex,
    resolvePreviousCurrentTodoIndex,
} from '../../../features/todoOverview/utility/currentTodoIndexResolver';
import { createDateKey } from '../../../utility/dateTimeUtilities';
import {
    checkIsFormKeyboardEvent,
    checkKeyDefinitionIsPressed,
} from '../../../utility/keyboardUtilities';
import {
    moveToNextTodoDefinition,
    moveToPreviousTodoDefinition,
} from '../../../constants/keyboardDefinitions';

export type SetCurrentTodoIndexHandler = (index: number) => void;

export default function useManageCurrentTodo(
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
) {
    const [currentTodoIndex, setCurrentTodoIndexState] = useState<number>(0);

    useEffect(() => {
        setCurrentTodoIndexState((currentTodoIndex) => {
            return resolvePossibleSameTodoIndex(
                itemsPerDate,
                currentDate,
                currentTodoIndex,
            );
        });
    }, [currentDate, itemsPerDate]);

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
            if (checkIsFormKeyboardEvent(event)) {
                return;
            }

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

    return { currentTodoIndex, setCurrentTodoIndex };
}
