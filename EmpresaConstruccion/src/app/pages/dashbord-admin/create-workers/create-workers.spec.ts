import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkers } from './create-workers';

describe('CreateWorkers', () => {
  let component: CreateWorkers;
  let fixture: ComponentFixture<CreateWorkers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorkers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateWorkers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
