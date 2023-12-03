import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Todo } from '../../interfaces';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCheckboxModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Output() removeTodoEvent = new EventEmitter<number>();
  @Output() completeTodoEvent = new EventEmitter<number>();
  @Input({ required: true }) todo!: Todo;

  removeTodo(id: number): void {
    this.removeTodoEvent.emit(id);
  }

  onChange(): void {
    this.completeTodoEvent.emit(this.todo.id);
  }
}
