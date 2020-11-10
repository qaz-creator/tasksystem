const {
  TOGGLE_FILTER,
  CLEAR_SEARCH,
  SEARCH_TASK,
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  CLEAR_EDIT,
  GET_TASKS,
  TASKS_ERROR,
  EDIT_TASK,
} = require('../types')

export default (state, { type, payload }) => {
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        errors: null,
      }
    case TASKS_ERROR:
      return {
        ...state,
        tasks: [],
        errors: payload,
      }
    case EDIT_TASK:
      return {
        ...state,
        editAble: payload,
      }
    case CLEAR_EDIT:
      return {
        ...state,
        editAble: null,
      }

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      }
    case REMOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
      }
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? payload : task,
        ),
      }
    case TOGGLE_FILTER:
      return {
        ...state,
        // copy the state, and change filterTask
        filterTask: !state.filterTask,
      }
    case SEARCH_TASK:
      const reg = new RegExp(`${payload}`, 'gi')
      return {
        ...state,
        search: state.tasks.filter((task) => task.name.match(reg)),
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        search: null,
      }
    default:
      return state
  }
}
