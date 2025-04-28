import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreedPictureComponent } from './breed-picture.component';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DogApiServiceMock } from '../../core/api/dog-api.service.mock.spec';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { provideTranslateTesting } from '../../core/providers/translate-testing.provider';

describe('BreedPictureComponent', () => {
  let component: BreedPictureComponent;
  let fixture: ComponentFixture<BreedPictureComponent>;
  let router: Router;

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
            params: of({ breed: 'bulldog', subBreed: 'english' }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedPictureComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch image on initialization', (done) => {
    expect(component.breedName).toBe('bulldog');
    expect(component.subBreedName).toBe('english');
    setTimeout(() => {
      expect(component.breedPicture).toBeTruthy();
      done();
    });
  });

  it('should fetch image on initialization when is not sub-breed', (done) => {
    component.subBreedName = '';
    component.fetchImage();
    expect(component.breedName).toBe('bulldog');
    expect(component.subBreedName).toBe('');
    setTimeout(() => {
      expect(component.breedPicture).toBeTruthy();
      done();
    });
  });

  it('should fetch sub-breeds excluding the current sub-breed', () => {
    expect(component.subBreeds).toBeTruthy();
    expect(component.subBreeds).not.toContain('english');
  });

  it('should navigate back to the list page', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['list']);
  });

  it('should navigate to a specific breed page', () => {
    component.goToBreedPage('french');
    expect(router.navigate).toHaveBeenCalledWith([
      'picture',
      'bulldog',
      'french',
    ]);
  });

  it('should navigate to the main breed page if no sub-breed is provided', () => {
    component.goToBreedPage();
    expect(router.navigate).toHaveBeenCalledWith(['picture', 'bulldog']);
  });
});
