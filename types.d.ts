export type RootStackParamList = {
    home: undefined;
    newTodo: undefined;
    editTodo: undefined;
    goBack: () => void;
    navigate: (url:string,obj?:{}) => void;
  };

export interface Task {
  isCompleted: boolean,
  description: string,
  id: string
}

export interface Todo {
  id: string,
  title: string,
  color: string,
  tasks?: Task[],
  remaining: number | string,
  completed: number | string,
}


interface ContextParams {
  todos?: Todo[] | undefined, 
  handlerContext?: ( key:string, value: any ) => void 
}
