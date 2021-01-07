export type Goal = {
    uid: string;
    title: string;
    description: string | null;
    timestamp: number;
};

export type GoalCollection = Goal[];
