const delay = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
);

export const fetchTodos = (filter) => (
  delay(500).then(() => {
    switch (filter) {
      case 'all':
        return fakeDatabase.todos;
      case 'active':
        return fakeDatabase.todos.filter(item => !item.completed);
      case 'completed':
        return fakeDatabase.todos.filter(item => item.completed);
      default:
        throw new Error(`Unknown fitler: ${filter}`);
    }
  })
);