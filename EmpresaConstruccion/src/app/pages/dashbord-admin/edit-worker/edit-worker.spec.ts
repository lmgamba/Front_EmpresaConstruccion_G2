import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorker } from './edit-worker';

describe('EditWorker', () => {
  let component: EditWorker;
  let fixture: ComponentFixture<EditWorker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
