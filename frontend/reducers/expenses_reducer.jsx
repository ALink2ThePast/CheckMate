import {
  RECEIVE_EXPENSES,
  RECEIVE_SINGLE_EXPENSE,
  RECEIVE_DELETION,
  RECEIVE_EXPENSE_ERRORS,
  RECEIVE_FRIEND_DETAILS
} from '../actions/expenses_actions';
import merge from 'lodash/merge';

const defaultState = {
  friend: {},
  items: {},
  errors: []
};

const ExpensesReducer = ( state = defaultState, action ) => {
  switch(action.type) {
    case RECEIVE_EXPENSES:
      return Object.assign({}, state, {
        items: action.expenses,
        errors: []
      });
    case RECEIVE_SINGLE_EXPENSE:
      return merge({}, state, {
        items: {[action.expense.id]: action.expense}
      });
    case RECEIVE_FRIEND_DETAILS:
      return Object.assign({}, state, {
        friend: action.friend
      });
    case RECEIVE_DELETION:
      const newItems = merge({}, state.items);
      delete newItems[action.expense.id];
      return Object.assign({}, state, {
        items: newItems,
        errors: []
      });
    case RECEIVE_EXPENSE_ERRORS:
      return Object.assign({}, state, {
        errors: action.errors
      });
    default:
      return state;
  }
};

export default ExpensesReducer;
