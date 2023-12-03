import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { TodoService } from '../../../../services/todo.service';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  @Output() addTodoEvent = new EventEmitter<string>();
  @Output() toggleAllEvent = new EventEmitter<boolean>();
  control: FormControl<string> = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });

  private todoService = inject(TodoService);
  isAllCompleted: Signal<boolean> = computed(() => this.todoService.todoList().every(todo => todo.completed));

  addTodo(): void {
    if (this.control.valid) {
      this.addTodoEvent.emit(this.control.value);
      this.control.reset();
    }
  }

  toggleAll(event: MatCheckboxChange): void {
    this.toggleAllEvent.emit(event.checked);
  }
}
