/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InforNewspaperComponent } from './infor-newspaper.component';

describe('InforNewspaperComponent', () => {
  let component: InforNewspaperComponent;
  let fixture: ComponentFixture<InforNewspaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforNewspaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforNewspaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
