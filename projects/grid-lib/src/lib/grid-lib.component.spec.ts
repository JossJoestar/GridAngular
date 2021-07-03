import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLibComponent } from './grid-lib.component';

describe('GridLibComponent', () => {
  let component: GridLibComponent;
  let fixture: ComponentFixture<GridLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
