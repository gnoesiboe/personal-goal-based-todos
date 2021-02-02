import { GoalCollection } from './goal';

export interface Role {
    uid: string;
    title: string;
    userUid: string;
    timestamp: Date;
}

export interface RoleWithGoals extends Role {
    goals: GoalCollection;
}
