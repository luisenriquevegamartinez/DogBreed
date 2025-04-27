import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedPictureComponent } from './breed-picture.component';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DogApiServiceMock } from '../../core/api/dog-api.service.mock.test';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideTranslateTesting } from '../../core/providers/translate-testing.provider';

describe('BreedPictureComponent', () => {
  let component: BreedPictureComponent;
  let fixture: ComponentFixture<BreedPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedPictureComponent, HttpClientTestingModule],
      providers: [
        provideHttpClientTesting(),
        provideTranslateTesting(),
        DogApiServiceMock,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ breed: 'bulldog' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
