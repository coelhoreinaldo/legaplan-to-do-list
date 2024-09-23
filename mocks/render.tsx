import { TaskContext } from '@/app/context/TaskContext';
import { render } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: { providerProps: any }
) => {
  return render(
    <MemoryRouterProvider>
      <TaskContext.Provider {...providerProps}> {ui} </TaskContext.Provider>
    </MemoryRouterProvider>,
    renderOptions
  );
};

const mockNextRouter = {
  push: jest.fn(),
  back: jest.fn(),
};

export { customRender, mockNextRouter };
