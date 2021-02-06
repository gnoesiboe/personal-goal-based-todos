import { sortTodoListItemsByPriority } from '../../../model/selector/todoListItemSelectors';
import {
    createDateKey,
    parseFirebaseTimestamp,
} from '../../../utility/dateTimeUtilities';
import { groupItemsWithCallback } from '../../../utility/arrayUtilities';
import { TodoListItem } from '../../../model/todoListItem';
import useFetchTodoListItems from './useFetchTodoListItems';
import useModifyTodoCollection from './useModifyTodoCollection';

export default function useManageTodoListItems(
    currentDate: Date,
    noOfDaysDisplayed: number,
) {
    const {
        items,
        fetchTodos,
        isFetching,
        setItems,
        refetchTodos,
    } = useFetchTodoListItems(currentDate, noOfDaysDisplayed);

    const {
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        removeTodo,
    } = useModifyTodoCollection(
        currentDate,
        noOfDaysDisplayed,
        fetchTodos,
        items,
        setItems,
    );

    let sortedItems: TodoListItem[] = [...(items || [])];
    if (sortedItems) {
        sortTodoListItemsByPriority(sortedItems);
    }

    const itemsPerDate = groupItemsWithCallback<TodoListItem>(
        sortedItems || [],
        (item) => createDateKey(parseFirebaseTimestamp(item.date)),
    );

    return {
        itemsPerDate,
        isFetching,
        addTodo,
        updateTodo,
        moveTodoOneDayForward,
        removeTodo,
        refetchTodos,
    };
}
