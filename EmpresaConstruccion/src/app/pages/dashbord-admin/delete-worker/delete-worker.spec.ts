import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteWorker } from './delete-worker';

describe('DeleteWorker', () => {
  let component: DeleteWorker;
  let fixture: ComponentFixture<DeleteWorker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteWorker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteWorker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
