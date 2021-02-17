import React, { useRef } from 'react';
import { TodoListItem as TodoListItemModel } from '../../model/todoListItem';
import classNames from './todoListItem.module.scss';
import createClassName from 'classnames';
import CheckboxInput from './components/CheckboxInput';
import useToggleDoneStatus from './hooks/useToggleDoneStatus';
import ActionButtonList from './components/ActionButtonList';
import ActionButton from './components/ActionButton';
import { useTodoListItems } from '../../context/todos/TodoListItemsContext';
import CurrentContentContainer from './components/CurrentContentContainer';
import Description from './components/Description';
import EditTodo from '../editTodo/EditTodo';
import Summary from './components/Summary';
import RemoveTodo from '../removeTodo/RemoveTodo';
import Breadcrumb from './components/Breadcrumb';
import {
    determineUrgencyScore,
    UrgencyScore,
} from '../../model/selector/todoListItemSelectors';
import DeadlineDescription from './components/DeadlineDescription';
import useScrollIntoView from '../../hooks/useScrollIntoView';

export type OnContainerClickHandler = (id: string) => void;

type Props = {
    item: TodoListItemModel;
    current: boolean;
    onContainerClick: OnContainerClickHandler;
};

const scrollIntoViewTopOffset = 50;
const scrollIntoViewTopTimeout = 400; // takes into account that items need to animate

const TodoListItem: React.FC<Props> = ({ item, current, onContainerClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { moveTodoOneDayForward } = useTodoListItems();

    const urgencyScore = determineUrgencyScore(item);

    const containerClassName = createClassName(classNames.container, {
        [classNames.containerIsCurrent]: current,
        [classNames.containerIsDone]: item.done,
        [classNames.containerIsExtremelyUrgent]:
            urgencyScore === UrgencyScore.ExtremelyUrgent,
        [classNames.containerIsUrgent]: urgencyScore === UrgencyScore.Urgent,
        [classNames.containerIsMildlyUrgent]:
            urgencyScore === UrgencyScore.MildlyUrgent,
    });

    const { onInputChange } = useToggleDoneStatus(item, current);

    useScrollIntoView(
        containerRef,
        current,
        scrollIntoViewTopOffset,
        scrollIntoViewTopTimeout,
    );

    return (
        <div
            className={containerClassName}
            onClick={() => onContainerClick(item.id)}
            ref={containerRef}
        >
            <div className={classNames.checkboxContainer}>
                <CheckboxInput item={item} onChange={onInputChange} />
            </div>
            <div className={classNames.content}>
                <Breadcrumb item={item} />
                <Summary item={item} />
                <DeadlineDescription item={item} />
                <CurrentContentContainer current={current}>
                    {item.description && (
                        <Description>{item.description}</Description>
                    )}
                    <ActionButtonList>
                        <EditTodo todo={item}>
                            {(onClick) => (
                                <ActionButton onClick={onClick}>
                                    edit
                                </ActionButton>
                            )}
                        </EditTodo>
                        <RemoveTodo todo={item}>
                            {(onClick) => (
                                <ActionButton onClick={onClick}>
                                    delete
                                </ActionButton>
                            )}
                        </RemoveTodo>
                        <ActionButton
                            onClick={() => moveTodoOneDayForward(item.id)}
                        >
                            tomorrow
                        </ActionButton>
                    </ActionButtonList>
                </CurrentContentContainer>
            </div>
        </div>
    );
};

export default TodoListItem;
