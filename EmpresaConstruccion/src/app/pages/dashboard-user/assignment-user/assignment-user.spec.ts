import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentUser } from './assignment-user';

describe('AssignmentUser', () => {
  let component: AssignmentUser;
  let fixture: ComponentFixture<AssignmentUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
