import { useEffect, useState } from 'react';
import { TodoListItem } from '../../../model/todoListItem';
import {
    resolveNextCurrentTodoIndex,
    resolvePossibleSameTodoIndex,
    resolvePreviousCurrentTodoIndex,
} from '../../../features/todoOverview/utility/currentTodoIndexResolver';

export default function useManageCurrentTodo(
    itemsPerDate: Record<string, TodoListItem[]>,
    currentDate: Date,
) {
    const [currentTodoIndex, setCurrentTodoIndex] = useState<number>(0);

    useEffect(() => {
        setCurrentTodoIndex((currentTodoIndex) => {
            return resolvePossibleSameTodoIndex(
                itemsPerDate,
                currentDate,
                currentTodoIndex,
            );
        });
    }, [currentDate, itemsPerDate]);

    useEffect(() => {
        const moveToNext = () => {
            setCurrentTodoIndex((currentTodoIndex) => {
                return resolveNextCurrentTodoIndex(
                    itemsPerDate,
                    currentDate,
                    currentTodoIndex,
                );
            });
        };

        const moveToPrevious = () => {
            setCurrentTodoIndex((currentTodoIndex) => {
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

    return { currentTodoIndex };
}
