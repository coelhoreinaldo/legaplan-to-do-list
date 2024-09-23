import { TaskContext } from '@/app/context/TaskContext';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import { AddTaskContent } from '@/app/components';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

const mockUpdateTask = jest.fn((id, updatedTask) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  }
});

const mockAddTask = jest.fn((task) => {
  tasks.push(task);
});

const mockNextRouter = {
  push: jest.fn(),
  back: jest.fn(),
};

const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: { providerProps: any }
) => {
  return render(
    <MemoryRouterProvider>
      <TaskContext.Provider {...providerProps}>{ui}</TaskContext.Provider>
    </MemoryRouterProvider>,
    renderOptions
  );
};

describe('The app', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockNextRouter);
  });

  it('should render a list of tasks', async () => {
    customRender(<Home />, { providerProps: { value: { tasks } } });
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByAltText('Lixeira')).toHaveLength(2);
    });

    expect(screen.getByTestId('task-1')).toBeInTheDocument();
  });

  it('should call updateTask with the correct arguments when checkbox is clicked', () => {
    customRender(<Home />, {
      providerProps: {
        value: {
          tasks,
          updateTask: mockUpdateTask,
        },
      },
    });
    const checkbox = screen.getByTestId('task-1');

    fireEvent.click(checkbox);

    expect(mockUpdateTask).toHaveBeenCalledWith(1, {
      id: 1,
      text: 'Task 1',
      completed: true,
    });

    fireEvent.click(checkbox);

    expect(mockUpdateTask).toHaveBeenCalledWith(1, {
      id: 1,
      text: 'Task 1',
      completed: false,
    });
  });

  it('should redirect to "/create" after addButton is clicked', async () => {
    customRender(<Home />, {
      providerProps: {
        value: {
          tasks,
        },
      },
    });
    const link = screen.getByText('Adicionar nova tarefa');

    fireEvent.click(link);

    expect(mockRouter.asPath).toEqual('/create');
  });

  it('should add a new task', async () => {
    mockRouter.push('/create');

    customRender(<AddTaskContent />, {
      providerProps: {
        value: {
          tasks,
          addTask: mockAddTask,
        },
      },
    });

    expect(tasks).toHaveLength(2);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual('/create');
    });

    const input = screen.getByPlaceholderText('Digite');
    const link = screen.getByText('Adicionar');

    fireEvent.change(input, { target: { value: 'Task 3' } });
    fireEvent.click(link);

    expect(tasks).toHaveLength(3);
  });
});
