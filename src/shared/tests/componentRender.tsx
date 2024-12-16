import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from 'app/providers/StoreProvider';

import type { StateSchema } from 'shared/types/StateSchema';

export interface componentRenderOptions {
    initialState?: StateSchema;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
  const {
    initialState,
  } = options;

  return render(
    <StoreProvider initialState={initialState}>
      {component}
    </StoreProvider>,
  );
}
