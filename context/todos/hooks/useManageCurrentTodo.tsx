import { useEffect, useState } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import {
    resolveNextCurrentTodoIndex,
    resolvePossibleSameTodoIndex,
    resolvePreviousCurrentTodoIndex,
} from '../../../features/todoOverview/utility/currentTodoIndexResolver';
import { createDateKey } from '../../../utility/dateTimeUtilities';

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
            const target = event.target;

            if (
                target instanceof HTMLInputElement ||
                target instanceof HTMLTextAreaElement
            ) {
                return;
            }

            if (
                event.altKey ||
                event.shiftKey ||
                event.ctrlKey ||
                event.metaKey
            ) {
                return;
            }

            if (event.key === 'ArrowDown') {
                moveToNext();
            } else if (event.key === 'ArrowUp') {
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
