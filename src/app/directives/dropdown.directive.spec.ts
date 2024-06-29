/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { DropdownDirective } from './dropdown.directive';
import { ElementRef } from '@angular/core';

describe('Directive: Dropdown', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: {} };
    const directive = new DropdownDirective(mockElementRef as ElementRef);
    expect(directive).toBeTruthy();
  });
});
