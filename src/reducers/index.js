import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

// Combines multiple reducers into a root reducer
export const todoApp = combineReducers({ todos });

export const getVisibleTodos = (state, filter) => (
  fromTodos.getVisibleTodos(state.todos, filter)
);

// Implements Redux combineReducers from scratch (for learning purposes)
// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](
//           state[key],
//           action
//         );
//         return nextState;
//       },
//       {} // Initiates nextState as an empty object
//     );
//   };
// };