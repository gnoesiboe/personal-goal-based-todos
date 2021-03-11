import { useEffect, useRef } from 'react';
import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import { TodoListItem } from '../../../model/todoListItem';
import { changeSubItemCheckedStatus } from '../utility/todoDescriptionModifier';

export default function useToggleCheckedStatusForSubItemsOnClick(
    item: TodoListItem,
) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { updateTodo } = useTodoListItems();

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const checkboxes = containerRef.current.querySelectorAll(
            'input[type=checkbox]',
        );

        const onCheckboxChange = (event: Event) => {
            const target = event.target;

            if (!(target instanceof HTMLInputElement)) {
                return;
            }

            const index = [...checkboxes].indexOf(target);

            if (index === -1) {
                return;
            }

            if (!item.description) {
                throw new Error(
                    'Expecting item to have a description at this point',
                );
            }

            const updatedDescription = changeSubItemCheckedStatus(
                item.description,
                index,
                target.checked,
            );

            // noinspection JSIgnoredPromiseFromCall
            updateTodo(item.id, {
                description: updatedDescription,
            });
        };

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', onCheckboxChange);
        });

        return () => {
            checkboxes.forEach((checkbox) => {
                checkbox.removeEventListener('change', onCheckboxChange);
            });
        };
    }, [containerRef.current]);

    return { containerRef };
}
