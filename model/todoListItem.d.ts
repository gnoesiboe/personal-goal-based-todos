import { Role } from './role.d';
import { Goal } from './goal.d';
export interface TodoListItem {
    id: string;
    date: Date;
    summary: string;
    done: boolean;
    urgent: boolean;
    important: boolean;
    userUid: string;
}

export interface TodoListItemWithGoalAndRole extends TodoListItem {
    goal: Goal | null;
    role: Role | null;
}
