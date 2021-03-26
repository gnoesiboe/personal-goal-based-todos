import { NotificationType } from '../model/notification';
import { useNotifications } from '../context/notification/NotificationContext';
import { useEffect, useState } from 'react';
import { RoleWithGoals } from '../model/role';
import { fetchAllRolesWithGoalsForUserOrderedByTimestamp } from '../repository/rolesRepository';
import { useLoggedInUser } from '../context/authentication/AuthenticationContext';
import { fetchAllCountersForUser } from '../repository/counterRepository';
import { Counter } from '../model/counter';

export default function useFetchUserRolesWithGoals() {
    const [rolesWithGoals, setRolesWithGoals] = useState<
        RoleWithGoals[] | null
    >(null);

    const [goalCounters, setGoalCounters] = useState<Counter[]>([]);

    const user = useLoggedInUser();

    const { notify } = useNotifications();

    useEffect(() => {
        if (!user) {
            return;
        }

        fetchAllRolesWithGoalsForUserOrderedByTimestamp(user.uid)
            .then((rolesWithGoals) => setRolesWithGoals(rolesWithGoals))
            .catch((error) => {
                notify(
                    'Oeps!',
                    'Er is iets foutgegaan bij het ophalen van de rollen. Probeer het later nog eens!',
                    NotificationType.Error,
                );

                console.error(error);
            });

        fetchAllCountersForUser(user.uid).then((results) => {
            setGoalCounters(results);
        });
    }, [user]);

    return {
        rolesWithGoals,
        isFetching: rolesWithGoals === null,
        goalCounters,
    };
}
