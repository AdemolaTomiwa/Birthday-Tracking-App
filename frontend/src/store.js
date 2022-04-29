import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middeware = [thunk];

// For Development
// const store = createStore(
//    rootReducer,
//    initialState,
//    compose(
//       applyMiddleware(...middeware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//          window.__REDUX_DEVTOOLS_EXTENSION__()
//    )
// );

// For Production
const store = createStore(
   rootReducer,
   initialState,
   compose(applyMiddleware(...middleware))
);

export default store;
