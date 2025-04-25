import { createContext, useReducer, ReactNode, ReactElement } from "react";
import { Task } from "../types/task";

interface TaskState {
  list: Task[];
}

const defaultTaskList: Task[] = [
  {
    id: "1",
    title: "Walk the dog",
    desc: "Take Bruno for a 30-minute walk in the park.",
    deadline: "1hours",
    completed: false,
  },
  {
    id: "2",
    title: "Finish homework",
    desc: "Complete the math and science assignments.",
    deadline: "1hours",
    completed: false,
  },
  {
    id: "3",
    title: "Call mom",
    desc: "Catch up with mom and check in on her.",
    deadline: "1hours",
    completed: true,
  },
  {
    id: "4",
    title: "Workout at the gym",
    desc: "Leg day: squats, lunges, and cardio.",
    deadline: "1hours",
    completed: false,
  },
];

const initialTaskState: TaskState = {
  list: defaultTaskList,
};

const enum REDUCER_ACTION_TYPE {
  ADD_TASK,
  REMOVE_TASK,
  COMPELETE_TASK,
  GET_TASK_BY_ID,
  EDIT_TASK,
  SEARCH_IN_TASKS,
  SHOW_COMPELTED_TASK,
}

interface TaskAction {
  type: REDUCER_ACTION_TYPE;
  payload?: Task | string | Task[] | undefined; 
}

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.payload as Task],
      };

    case REDUCER_ACTION_TYPE.REMOVE_TASK:
      return {
        ...state,
        list: [...state.list.filter((task) => task.id !== (action.payload as string))],
      };

    case REDUCER_ACTION_TYPE.COMPELETE_TASK:
      return {
        ...state,
        list: [
          ...state.list.map((task) =>
            task.id === (action.payload as Task).id
              ? {
                  ...task,
                  completed: (action.payload as Task).completed,
                }
              : task
          ),
        ],
      };

    case REDUCER_ACTION_TYPE.GET_TASK_BY_ID:
      return {
        ...state,
        list: action.payload as Task[] || [],
      };
    case REDUCER_ACTION_TYPE.EDIT_TASK:
      return {
        ...state,
        list: [
          ...state.list.map((task) =>
            task.id === (action.payload as Task).id
              ? {
                  ...task,
                  title: (action.payload as Task).title,
                  desc: (action.payload as Task).desc,
                  deadline: (action.payload as Task).deadline,
                }
              : task
          ),
        ],
      };
    case REDUCER_ACTION_TYPE.SEARCH_IN_TASKS:
      return {
        ...state,
        list: [
          ...state.list.filter((task) =>
            task.title.toLowerCase().includes(action.payload as string)
          ),
        ],
      };
    case REDUCER_ACTION_TYPE.SHOW_COMPELTED_TASK:
      return {
        ...state,
        list: [...state.list.filter((task) => task.completed !== false)],
      };
    default:
      throw new Error("something is wrong");
  }
};

const saveToLocalStorage = (key: string, value: Task[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error retrieving from local storage", error);
    return null;
  }
};

const useMainContext = () => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const getTaskById = (key: string) => {
    const storedList = getFromLocalStorage(key);

    if (storedList && Array.isArray(storedList)) {
      dispatch({
        type: REDUCER_ACTION_TYPE.GET_TASK_BY_ID,
        payload: storedList,
      });
    } else {
      saveToLocalStorage(key, defaultTaskList);
      dispatch({
        type: REDUCER_ACTION_TYPE.GET_TASK_BY_ID,
        payload: defaultTaskList,
      });
    }
  };

  const addTask = (task: Task) => {
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_TASK, payload: task });
    const updateTask = [...state.list, task];

    saveToLocalStorage("lists", updateTask);
  };

  const removeTask = (id: string) => {
    dispatch({ type: REDUCER_ACTION_TYPE.REMOVE_TASK, payload: id });
    const updateTask = state.list.filter((task: Task) => task.id !== id);

    saveToLocalStorage("lists", updateTask);
  };

  const completedTask = (task: Task): void => {
    dispatch({
      type: REDUCER_ACTION_TYPE.COMPELETE_TASK,
      payload: task,
    });

    const updatedList = state.list.map((taskTarget: Task) =>
      taskTarget.id === task.id
        ? {
            ...taskTarget,
            completed: task.completed,
          }
        : taskTarget
    );

    saveToLocalStorage("lists", updatedList);
  };

  const editTask = (task: Task): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.EDIT_TASK, payload: task });
    const updateTask = state.list.map((taskTarget: Task) =>
      taskTarget.id === task.id
        ? {
            ...taskTarget,
            title: task.title,
            desc: task.desc,
            deadline: task.deadline,
          }
        : taskTarget
    );

    saveToLocalStorage("lists", updateTask);
  };

  const searchInTask = (target: string): void => {
    const lowercasedTarget = target.toLowerCase();

    dispatch({
      type: REDUCER_ACTION_TYPE.SEARCH_IN_TASKS,
      payload: lowercasedTarget,
    });

    if (target.length === 0) {
      const storedList = getFromLocalStorage("lists");
      dispatch({
        type: REDUCER_ACTION_TYPE.GET_TASK_BY_ID,
        payload: storedList || defaultTaskList,
      });
    }
  };
  
  const showCompletedTask = (): void => {
    dispatch({ type: REDUCER_ACTION_TYPE.SHOW_COMPELTED_TASK });
    const updateTask = state.list.filter((task) => task.completed !== false);

    saveToLocalStorage("listsCompleted", updateTask);
  };

  return {
    state,
    removeTask,
    searchInTask,
    addTask,
    completedTask,
    getTaskById,
    editTask,
    showCompletedTask,
  };
};

type MainContextType = ReturnType<typeof useMainContext>;

const intialContextState: MainContextType = {
  state: initialTaskState,
  addTask: async () => {},
  removeTask: async () => {},
  searchInTask: async () => {}, 
  completedTask: async () => {}, 
  editTask: async () => undefined, 
  getTaskById: () => undefined, 
  showCompletedTask: async () => undefined,
};

export const MainContext = createContext<MainContextType>(intialContextState);

type MainProviderProps = { children: ReactNode };

export const MainProvider = ({ children }: MainProviderProps): ReactElement => {
  const mainContextValue = useMainContext();

  return (
    <MainContext.Provider value={mainContextValue}>
      {children}
    </MainContext.Provider>
  );
};
