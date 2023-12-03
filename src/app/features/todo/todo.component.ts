import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';

import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ListFooterComponent } from './components/list-footer/list-footer.component';
import { TodoService } from '../../services/todo.service';
import { FilterCategories, Todo } from './interfaces';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoItemComponent, AddTodoComponent, ListFooterComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent {
  private todoService = inject(TodoService);
  filteredTodos: Signal<Todo[]> = computed(() => {
    const todos = this.todoService.todoList();
    const activeFilter = this.todoService.activeFilter();

    switch(activeFilter) {
      case FilterCategories.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FilterCategories.COMPLETED:
        return todos.filter(todo => todo.completed);
      case FilterCategories.ALL:
        return todos;
    }
  });
  todoList: Signal<Todo[]> = computed(() => this.todoService.todoList());
  uncompletedTodos: Signal<number> = computed(() => this.todoList().filter((todo: Todo) => !todo.completed).length);

  addTodo(text: string): void {
    this.todoService.addTodo(text);
  }

  removeTodo(id: number): void {
    this.todoService.removeTodo(id);
  }

  completeTodo(id: number): void {
    this.todoService.completeTodo(id);
  }

  setActiveFilter(filter: FilterCategories): void {
    this.todoService.setActiveFilter(filter);
  }

  toggleAll(isCompleted: boolean): void {
    this.todoService.toggleAll(isCompleted);
  }
}
