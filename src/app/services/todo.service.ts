import { Injectable, signal, WritableSignal } from '@angular/core';

import { FilterCategories, Todo } from '../features/todo/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: WritableSignal<Todo[]> = signal<Todo[]>([{ id: Date.now(), text: 'Create the app', completed: true }]);
  activeFilter: WritableSignal<FilterCategories> = signal(FilterCategories.ALL);

  addTodo(text: string): void {
    const newTodo: Todo = { id: Date.now(), text, completed: false }
    this.todoList.update((todoList: Todo[]) => [...todoList, newTodo]);
  }

  removeTodo(id: number): void {
    this.todoList.update((todoList: Todo[]) => todoList.filter(todo => todo.id !== id));
  }

  completeTodo( id: number): void {
    this.todoList.update((todoList: Todo[]) => todoList.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  toggleAll(isCompleted: boolean): void {
    this.todoList.update((todoList: Todo[]) => todoList.map(todo => ({ ...todo, completed: isCompleted })))
  }

  setActiveFilter(filter: FilterCategories): void {
    this.activeFilter.set(filter);
  }
}
