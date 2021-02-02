import React, { MouseEventHandler } from 'react';
import { TodoListItem } from '../../model/todoListItem';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';

type Props = {
    todo: TodoListItem;
    children: (onClick: MouseEventHandler) => JSX.Element;
};

const RemoveTodo: React.FC<Props> = ({ children, todo }) => {
    const { removeTodo } = useTodoListItems();

    return children(() => removeTodo(todo.id));
};

export default RemoveTodo;
