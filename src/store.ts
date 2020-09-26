import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as reducers from 'reducers';
import { State as CardsState } from 'reducers/cards';
import { State as ColorsState } from 'reducers/colors';
import { State as BoardState } from 'reducers/boards';
import { State as LabelNamesState } from 'reducers/labelNames';
import { State as UsersState } from 'reducers/users';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

export const history = createBrowserHistory();

export type StoreState = {
  cards: CardsState;
  colors: ColorsState;
  boards: BoardState,
  labelNames: LabelNamesState,
  users: UsersState
}

export default createStore(combineReducers(
  {
    ...reducers,
    router: connectRouter(history),
  }),
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    // logger
  )
)