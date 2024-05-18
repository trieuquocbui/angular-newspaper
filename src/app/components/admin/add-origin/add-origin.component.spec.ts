/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddOriginComponent } from './add-origin.component';

describe('AddOriginComponent', () => {
  let component: AddOriginComponent;
  let fixture: ComponentFixture<AddOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
