import { useTodoListItems } from '../../../context/todos/TodoListItemsContext';
import { TodoListItem } from '../../../model/todoListItem';
import { OnContainerClickHandler } from '../../todoListItem/TodoListItem';

export default function useSetCurrentItemOnContainerClick(
    items: TodoListItem[],
    currentDate: boolean,
) {
    const { setCurrentTodoIndex } = useTodoListItems();

    const onContainerClick: OnContainerClickHandler = (id) => {
        if (!currentDate) {
            return;
        }

        const newCurrentIndex = items.findIndex(
            (cursorItem) => cursorItem.id === id,
        );

        if (newCurrentIndex === -1) {
            return;
        }

        setCurrentTodoIndex(newCurrentIndex);
    };

    return onContainerClick;
}
