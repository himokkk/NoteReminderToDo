import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoCreateComponent } from './to-do-create.component';

describe('ToDoCreateComponent', () => {
  let component: ToDoCreateComponent;
  let fixture: ComponentFixture<ToDoCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToDoCreateComponent]
    });
    fixture = TestBed.createComponent(ToDoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
