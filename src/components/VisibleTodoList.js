import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVisibleTodos } from '../reducers'
import { toggleTodo } from '../actions/actions';
import TodoList from './TodoList';



const mapStateToProps = (state, { match }) => ({
  todos: getVisibleTodos(
    state,
    match.params.filter || 'all'
  )
});

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   }
// });

const VisibleTodoList = withRouter(connect(
  mapStateToProps, 
  { onTodoClick: toggleTodo } // Shorthand of mapDispatchToProps above
)(TodoList));

export default VisibleTodoList;