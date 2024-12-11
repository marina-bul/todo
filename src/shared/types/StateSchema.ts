export interface Todo {
  id: number
  text: string
  isCompleted: boolean
}

export interface StateSchema {
  todos: Todo[]
}