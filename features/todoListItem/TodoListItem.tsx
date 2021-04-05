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
import TodoListItemDescription from '../todoListItemDescription/TodoListItemDescription';
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

type Props = {
    item: TodoListItemModel;
    current?: boolean;
    onContainerClick?: () => void;
    expanded?: boolean;
};

const scrollIntoViewTopOffset = 50;
const scrollIntoViewTopTimeout = 400; // takes into account that items need to animate

const TodoListItem: React.FC<Props> = ({
    item,
    current = false,
    expanded = false,
    onContainerClick,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { moveTodoOneDayForward, moveToNextWeek } = useTodoListItems();

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
            onClick={() => onContainerClick && onContainerClick()}
            ref={containerRef}
        >
            <div className={classNames.checkboxContainer}>
                <CheckboxInput
                    item={item}
                    onChange={onInputChange}
                    urgencyScore={urgencyScore}
                />
            </div>
            <div className={classNames.content}>
                <Breadcrumb item={item} />
                <Summary item={item} />
                <DeadlineDescription item={item} />
                <CurrentContentContainer visible={current || expanded}>
                    <TodoListItemDescription item={item} />
                    <ActionButtonList>
                        <EditTodo todo={item} current={current}>
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
                        {item.date && (
                            <ActionButton
                                onClick={() => moveTodoOneDayForward(item.id)}
                            >
                                tomorrow
                            </ActionButton>
                        )}
                        {item.date && (
                            <ActionButton
                                onClick={() => moveToNextWeek(item.id)}
                            >
                                next week
                            </ActionButton>
                        )}
                    </ActionButtonList>
                </CurrentContentContainer>
            </div>
        </div>
    );
};

export default TodoListItem;
