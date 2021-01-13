import React, { ReactElement } from 'react';
import classNames from '../todoOverview.module.scss';

type Props = {
    children: ReactElement[];
};

const TodoList: React.FC<Props> = ({ children }) => (
    <ul className={classNames.todoList}>
        {React.Children.map(children, (child) => (
            <li key={child.key}>{child}</li>
        ))}
    </ul>
);

export default TodoList;
