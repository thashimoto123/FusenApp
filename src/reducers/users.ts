import { Reducer } from 'redux';
import { IUser } from 'core/entities/user';

export type State = IUser[];

const initialUsersState: State = [];


const usersReducer: Reducer<State> = (state = initialUsersState) => {
  return state;
}

export default usersReducer