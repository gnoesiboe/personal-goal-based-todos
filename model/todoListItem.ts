import { TodoListItemFirebaseData } from '../firebase/model/todoListItem';

export interface TodoListItem extends TodoListItemFirebaseData {
    id: string;
    goalTitle: string | null;
    roleTitle: string | null;
    quickfix: boolean;
    waiting: boolean;
    evening: boolean;
}

export enum PriorityLevel {
    UrgentAndImportant = '1',
    NotUrgentAndImportant = '2',
    UrgentAndNotImportant = '3',
    NotUrgentAndNotImportant = '4',
}
