import { FETCH_FRIENDS,
         REQUEST_FRIEND,
         APPROVE_FRIEND,
         DENY_FRIEND,
         SEARCH_USERS } from '../actions/friends_actions';
import { fetchFriends,
         receiveFriends,
         requestFriend,
         approveFriend,
         denyFriend,
         receiveSingleFriend,
         receiveApprovedFriend,
         receiveDeniedFriend,
         receiveUsers,
         receiveErrors } from '../actions/friends_actions';
import { fetchAllFriends,
         requestFriendship,
         approveFriendship,
         denyFriendship,
         searchUsers } from '../util/friends_api_util';

const FriendsMiddleware = ({getState, dispatch}) => (next) => (action) => {
  const fetchSuccess = (friends) => dispatch(receiveFriends(friends));
  const requestSuccess = (friend) => dispatch(receiveSingleFriend(friend));
  const approveSuccess = (friend) => dispatch(receiveApprovedFriend(friend));
  const denySuccess = (friend) => dispatch(receiveDeniedFriend(friend));
  const searchSuccess = (users) => dispatch(receiveUsers(users));
  const error = (xhr) => receiveErrors(xhr.responseJSON);

  switch(action.type) {
    case FETCH_FRIENDS:
      fetchAllFriends(fetchSuccess, error);
      return next(action);
    case REQUEST_FRIEND:
      requestFriendship(action.friend, requestSuccess, error);
      return next(action);
    case APPROVE_FRIEND:
      approveFriendship(action.friend, approveSuccess, error);
      return next(action);
    case DENY_FRIEND:
      denyFriendship(action.friend, denySuccess, error);
      return next(action);
    case SEARCH_USERS:
      searchUsers(action.query.fname_query,
                  action.query.lname_query,
                  searchSuccess,
                  error)
      return next(action);
    default:
      return next(action);
  }
}

export default FriendsMiddleware;
