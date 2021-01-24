import { Role } from './role.d';
import { Goal } from './goal.d';
import { TodoListItemFirebaseData } from '../firebase/model/todoListItem';

export interface TodoListItem extends TodoListItemFirebaseData {
    id: string;
    goalTitle: string | null;
    roleTitle: string | null;
}
