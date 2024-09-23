import Home from '@/app/page';
import '@testing-library/jest-dom';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { AddTaskContent } from '@/app/components';
import { useRouter } from 'next/navigation';
import { mockAddTask, mockUpdateTask, tasks } from './mocks/tasks';
import { customRender, mockNextRouter } from './mocks/render';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

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
