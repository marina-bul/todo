import { Provider } from 'react-redux';

import { createReduxStore } from './store';
import data from './data.json';

import type { FC, PropsWithChildren } from 'react';
import type { StateSchema } from 'shared/types/StateSchema';

interface StoreProviderProps extends PropsWithChildren{
  initialState?: StateSchema
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState = { todos: data } }) => {
  const store = createReduxStore(initialState)

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}