/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TopicSetComponent } from './topic-set.component';

describe('TopicSetComponent', () => {
  let component: TopicSetComponent;
  let fixture: ComponentFixture<TopicSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
