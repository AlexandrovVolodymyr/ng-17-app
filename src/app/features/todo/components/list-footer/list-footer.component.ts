import {
  ChangeDetectionStrategy,
  Component, computed,
  EventEmitter,
  inject,
  Input,
  Output, Signal,
  signal,
  WritableSignal
} from '@angular/core';

import { TodoService } from '../../../../services/todo.service';
import { FilterCategories } from '../../interfaces';

@Component({
  selector: 'app-list-footer',
  standalone: true,
  imports: [],
  templateUrl: './list-footer.component.html',
  styleUrl: './list-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFooterComponent {
  @Output() setActiveFilterEvent = new EventEmitter<FilterCategories>();
  @Input() uncompletedTodos?: number;
  filterCategories: WritableSignal<string[]> = signal(['All', 'Active', 'Completed']);

  private todoService = inject(TodoService);
  activeFilter: Signal<FilterCategories> = computed(() => this.todoService.activeFilter());

  setFilter(index: number): void {
    this.setActiveFilterEvent.emit(this.filterCategories()[index] as FilterCategories);
  }
}
