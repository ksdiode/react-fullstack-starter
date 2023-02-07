import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import todo from './todo';
import blog from './blog';

const reducer = {
  user,
  todo,
  blog,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const StoreProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default StoreProvider;
