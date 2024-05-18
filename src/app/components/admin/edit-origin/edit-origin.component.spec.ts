/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditOriginComponent } from './edit-origin.component';

describe('EditOriginComponent', () => {
  let component: EditOriginComponent;
  let fixture: ComponentFixture<EditOriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOriginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
