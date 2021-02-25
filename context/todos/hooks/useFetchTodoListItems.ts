import { fetchAllForUserForUpcomingDates } from '../../../repository/todoListItemRepository';
import { NotificationType } from '../../../model/notification';
import { Dispatch, useEffect } from 'react';
import { useLoggedInUser } from '../../authentication/AuthenticationContext';
import { useNotifications } from '../../notification/NotificationContext';
import { Action, ActionType } from '../model/actionTypes';

export type FetchTodoHandler = (
    date: Date,
    noOfDays: number,
    userUid: string,
) => Promise<boolean>;

export default function useFetchTodoListItems(
    firstVisibleDate: Date,
    numberOfDaysDisplayed: number,
    dispatch: Dispatch<Action>,
) {
    const user = useLoggedInUser();

    const { notify } = useNotifications();

    const fetchTodos: FetchTodoHandler = async (date, noOfDays, userUid) => {
        dispatch({
            type: ActionType.StartFetchingItems,
        });

        try {
            const incomingItems = await fetchAllForUserForUpcomingDates(
                date,
                noOfDays,
                userUid,
            );

            dispatch({
                type: ActionType.LoadIncomingTodoListItems,
                items: incomingItems,
            });

            return true;
        } catch (error) {
            console.error(
                'Something went wrong wile fetching todo list items',
                error,
            );

            notify(
                'Oeps!',
                'Er is iets foutgegaan bij het ophalen van de items. Probeer het later nog eens!',
                NotificationType.Error,
            );

            dispatch({
                type: ActionType.StopFetchingItems,
            });
        }

        return false;
    };

    useEffect(() => {
        if (!user || numberOfDaysDisplayed === 0) {
            return;
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchTodos(firstVisibleDate, numberOfDaysDisplayed, user.uid);
    }, [firstVisibleDate, numberOfDaysDisplayed, user]);

    const refetchTodos = () => {
        if (!user || numberOfDaysDisplayed === 0) {
            return;
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchTodos(firstVisibleDate, numberOfDaysDisplayed, user.uid);
    };

    return { fetchTodos, refetchTodos };
}
