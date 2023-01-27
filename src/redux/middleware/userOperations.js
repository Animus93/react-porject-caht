import store from '../store';
import { login } from '../userSlice';

const userOperations = api => next => action => {
  if (action.type === 'users/executeMutation/fulfilled') {
   if(!action.payload.length){ if(action.payload.isOnline){
      store.dispatch(login(action.payload));
    }
    if(!action.payload.isOnline){
      store.dispatch(login(''))
    }}
  }
  return next(action);
};

export default userOperations
