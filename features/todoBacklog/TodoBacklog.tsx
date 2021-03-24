import React from 'react';
import Heading from '../../primitives/heading/Heading';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';
import TodoListItem from '../todoListItem/TodoListItem';
import UnorderedList from '../../primitives/unorderedList/UnorderedList';
import Card from '../../primitives/card/Card';
import CardList from '../../primitives/cardList/CardList';
import classNames from './todoBacklog.module.scss';

const TodoBacklog: React.FC = () => {
    const { backlogItems } = useTodoListItems();

    if (!backlogItems) {
        return null;
    }

    return (
        <>
            <Heading tag="h2" centered className={classNames.heading}>
                Backlog
            </Heading>
            <CardList>
                {Object.keys(backlogItems).map((roleTitle) => {
                    const items = backlogItems[roleTitle];

                    return (
                        <Card.Container key={roleTitle}>
                            <Card.Header>
                                <Heading tag="h3" centered flattened>
                                    {roleTitle}
                                </Heading>
                            </Card.Header>
                            <Card.Body>
                                <UnorderedList direction="vertical">
                                    {items.map((item) => (
                                        <TodoListItem
                                            item={item}
                                            key={item.id}
                                            expanded
                                        />
                                    ))}
                                </UnorderedList>
                            </Card.Body>
                        </Card.Container>
                    );
                })}
            </CardList>
        </>
    );
};

export default TodoBacklog;
