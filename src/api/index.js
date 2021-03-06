import { v4 } from 'uuid';

// This is a fake in-memory implementation of something
// that would be implemented by calling a REST server.

const fakeDatabase = {
  todos: [{
    id: v4(),
    text: 'hey',
    completed: true,
  }, {
    id: v4(),
    text: 'ho',
    completed: true,
  }, {
    id: v4(),
    text: 'let’s go',
    completed: false,
  }],
};

const delay = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
);

export const fetchTodos = (filter) => (
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(todo => !todo.completed);
      case 'completed':
        return fakeDatabase.todos.filter(todo => todo.completed);
      default:
        throw new Error(`Unknown fitler: ${filter}`);
    }
  })
);

export const addTodo = (text) => (
  delay(500).then(() => {
    const todo = {
      id: v4(),
      text,
      completed: false
    };
    fakeDatabase.todos.push(todo);
    return todo;
  })
);

export const toggleTodo = (id) => (
  delay(500).then(() => {
    const todo = fakeDatabase.todos.find(item => item.id === id);
    todo.completed = !todo.completed;
    return todo;
  })
);