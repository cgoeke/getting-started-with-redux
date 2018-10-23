import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';
import { todoApp } from './reducers/reducers';
import VisibleTodoList from './components/VisibleTodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

// Implements Redux createStore from scratch
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

// Checks local storage for persisted state
const persistedState = loadState();
// Initiates Redux store passing in the root reducer
const store = createStore(todoApp, persistedState);
// Saves current app state to local storage
store.subscribe(() => {
  saveState({
    todos: store.getState().todos
  });
});

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp/>
  </Provider>,
  document.getElementById('root')
);
