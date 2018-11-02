import * as api from '../api';
import { normalize } from 'normalizr';
import * as normSchema from './schema';
import { getIsFetching } from '../reducers/createList';

export const fetchTodos = (filter) => (dispatch, getState) => {
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_TODOS_REQUEST',
    filter
  });

  return api.fetchTodos(filter).then(
    response => {
      dispatch({
        type: 'FETCH_TODOS_SUCCESS',
        filter,
        response: normalize(response, normSchema.arrayOfTodos)
      });
    },
    error => {
      dispatch({
        type: 'FETCH_TODOS_FAILURE',
        filter,
        message: error.message || 'Something went wrong :('
      });
    }
  );
};

export const addTodo = (text) => (dispatch) => (
  api.addTodo(text).then(response => {
    dispatch({
      type: 'ADD_TODO_SUCCESS',
      response: normalize(response, normSchema.todo)
    });
  })
);

export const toggleTodo = (id) => (dispatch) => (
  api.toggleTodo(id).then(response => {
    dispatch({
      type: 'TOGGLE_TODO_SUCCESS',
      response: normalize(response, normSchema.todo)
    });
  })
);