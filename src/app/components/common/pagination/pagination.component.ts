import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPageNumber!: number;
  @Input() totalPageNumber!: number;
  @Input() offset !: number;
  @Output() goToPage: EventEmitter<number | string> = new EventEmitter<number | string>();

  constructor() { }

  ngOnInit() {
  }

  getPaginationGenerator():(number|string)[] {
  // By doing this, when we are close to the beginning or end of the pagination, two numbers are generated after/before the current page, 
  // but when we are far from these points (in the middle of the pagination), we generate only one number after/before the current page.
  const offsetNumber =
    this.currentPageNumber <= this.offset || this.currentPageNumber > this.totalPageNumber - this.offset ? this.offset : this.offset - 1;
  const numbersList = [];
  const numbersListWithDots: (number|string)[] = [];

  // If itemsPerPage is less than what the user selected with the Select component or if there is no page or only one page:
  if (this.totalPageNumber <= 1 || this.totalPageNumber === undefined) return [1];

  // Create list of numbers:
  numbersList.push(1);
  for (let i = this.currentPageNumber - offsetNumber; i <= this.currentPageNumber + offsetNumber; i++) {
    if (i < this.totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(this.totalPageNumber);

  // Add three dots to the list of numbers:
  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push('...');
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
  }
}
