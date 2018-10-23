import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { 
  combineReducers,
  createStore 
} from 'redux';
import TodoList from './components/TodoList';
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


// Reducer funtions
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
  
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(item => todo(item, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// Implements Redux combineReducers from scratch
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

// Combines multiple reducers into a root reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

// Initiates Redux store passing in the root reducer
const store = createStore(todoApp);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(todo => !todo.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(todo => todo.completed)
  }
}

let nextTodoId = 0; 
const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo 
      onAddClick={(text) =>
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text
        })
      }
    />
    <TodoList 
      todos={
        getVisibleTodos(
          todos, 
          visibilityFilter
        )
      }
      onTodoClick={(id) =>
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }  
    />
    <Footer 
      visibilityFilter={visibilityFilter}
      onFilterClick={(filter) => {
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }}
    />
  </div>
);

// Renders Counter component to DOM passing in state and props
const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  );
}

// Re-renders on store state change
store.subscribe(render);
render();