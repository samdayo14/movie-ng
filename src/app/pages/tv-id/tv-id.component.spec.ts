import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvIdComponent } from './tv-id.component';

describe('TvIdComponent', () => {
  let component: TvIdComponent;
  let fixture: ComponentFixture<TvIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
