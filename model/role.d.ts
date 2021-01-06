import { GoalCollection } from './goal';

export interface Role {
    uid: string;
    title: string;
    userUid: string;
}

export interface RoleWithGoals extends Role {
    goals: GoalCollection;
}
