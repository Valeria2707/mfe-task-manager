import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchParams } from '../../types/params';
import { PRIORITY } from '../../constants/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class TaskFilterComponent implements OnInit {
  filters: SearchParams = {};
  PRIORITY = PRIORITY;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.filters = { ...params } as SearchParams;
    });
  }

  handleChange<T extends keyof SearchParams>(
    value: SearchParams[T],
    key: T
  ): void {
    this.filters[key] = value;
  }

  handleApply(): void {
    this.router.navigate([], {
      queryParams: this.filters,
      queryParamsHandling: 'merge',
    });
  }

  handleReset(): void {
    this.router.navigate([], {
      queryParams: {},
    });
  }
}
