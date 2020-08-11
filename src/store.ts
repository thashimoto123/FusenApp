import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as reducers from 'reducers';
import { State as CardListState } from 'reducers/cardList';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const history = createBrowserHistory();

export type StoreState = {
  cardList: CardListState;
}

export default createStore(combineReducers(
  {
    ...reducers,
    router: connectRouter(history),
  }),
  applyMiddleware(
    routerMiddleware(history),
    thunk,
    logger
  )
)