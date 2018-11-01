import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todos from './reducers';

const configureStore = () => {
  // Initiates Redux store passing in the root reducer and any middleware
  return createStore(
    todos,
    applyMiddleware(thunk)
  );
};

export default configureStore;

// Implements Redux createStore from scratch (for learning purposes)
// const createStore = (reducer) => {
//   let state;
//   let listeners = [];

//   const getState = () => state;

//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach(listener => listener());
//   };

//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => { // Returns function to unsubscribe listener
//       listeners = listeners.filter(l => l !== listener);
//     };
//   };

//   dispatch({}); // Sets initial value

//   return { getState, dispatch, subscribe };
// }