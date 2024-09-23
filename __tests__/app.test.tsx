import { TaskContext } from '@/app/context/TaskContext';
import Home from '@/app/page';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ReactElement } from 'react';

const tasks = [
  { id: 1, text: 'Task 1', completed: false },
  { id: 2, text: 'Task 2', completed: true },
];

const mockUpdateTask = jest.fn((id, updatedTask) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex] = updatedTask;
});

const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: { providerProps: any }
) => {
  return render(
    <TaskContext.Provider {...providerProps}>{ui}</TaskContext.Provider>,
    renderOptions
  );
};

beforeEach(() => {
  customRender(<Home />, {
    providerProps: {
      value: {
        tasks,
        addTask: jest.fn(),
        deleteTask: jest.fn(),
        updateTask: mockUpdateTask,
      },
    },
  });
});

describe('The app', () => {
  it('should render an list of tasks', async () => {
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByAltText('Lixeira')).toHaveLength(2);
    });

    expect(screen.getByTestId('task-1')).toBeInTheDocument();
  });

  it('should call updateTask with the correct arguments when checkbox is clicked', () => {
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
});
