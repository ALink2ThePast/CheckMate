import {
  RECEIVE_SINGLE_EXPENSE,
  RECEIVE_DELETION,
  RECEIVE_EXPENSE_ERRORS,
  RECEIVE_FRIEND_DETAILS,
  RECEIVE_SETTLED_EXPENSES } from '../actions/expenses_actions';
import { RECEIVE_SINGLE_TRANSACTION,
         RECEIVE_TRANSACTION_DELETION } from '../actions/transactions_actions';
import merge from 'lodash/merge';

const defaultState = {
  friend: {},
  items: {},
  balance: 0,
  transactions: {},
  errors: [],
  settled: {}
};

const ExpensesReducer = ( state = defaultState, action ) => {
  switch(action.type) {
    case RECEIVE_SINGLE_EXPENSE:
      return merge({}, state, {
        items: {[action.expense.id]: action.expense},
        balance: Number(state.balance) + Number(action.expense.balance_change)
      });
    case RECEIVE_FRIEND_DETAILS:
      return Object.assign({}, state, {
        friend: action.friend.user,
        items: action.friend.expenses,
        balance: action.friend.balance,
        transactions: action.friend.transactions
      });
    case RECEIVE_DELETION:
      const newItems = merge({}, state.items);
      delete newItems[action.expense.id];
      return Object.assign({}, state, {
        items: newItems,
        errors: [],
        balance: Number(state.balance) + Number(action.expense.balance_change)
      });
    case RECEIVE_SINGLE_TRANSACTION:
      const newState = merge({}, state, {
        transactions: { [action.transaction.id]: action.transaction }
      });
      return merge({}, state, {
        transactions: { [action.transaction.id]: action.transaction }
      });
    case RECEIVE_TRANSACTION_DELETION:
      const newTransactions = Object.assign({}, state.transactions);
      delete newTransactions[action.transaction.id];
      return Object.assign({}, state, {
        transactions: newTransactions
      });
    case RECEIVE_EXPENSE_ERRORS:
      return Object.assign({}, state, {
        errors: action.errors
      });
    case RECEIVE_SETTLED_EXPENSES:
      return Object.assign({}, state, {
        settled: action.expenses
      });
    default:
      return state;
  }
};

export default ExpensesReducer;
