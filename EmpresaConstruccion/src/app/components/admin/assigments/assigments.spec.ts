import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assigments } from './assigments';

describe('Assigments', () => {
  let component: Assigments;
  let fixture: ComponentFixture<Assigments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assigments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assigments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
