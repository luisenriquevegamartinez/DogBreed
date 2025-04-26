import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedPictureComponent } from './breed-picture.component';

describe('BreedPictureComponent', () => {
  let component: BreedPictureComponent;
  let fixture: ComponentFixture<BreedPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedPictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
