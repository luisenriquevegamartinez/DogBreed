import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BredListComponent } from './bred-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideTranslateTesting } from '../../core/providers/translate-testing.provider';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DogApiServiceMock } from '../../core/api/dog-api.service.mock.spec';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

describe('BredListComponent', () => {
  let component: BredListComponent;
  let fixture: ComponentFixture<BredListComponent>;
  let router: Router;
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BredListComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        provideHttpClientTesting(),
        provideTranslateTesting(),
        DogApiServiceMock,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BredListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    translate = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize breeds list', () => {
    expect(component.filteredBreeds).toEqual([{ name: 'bulldog', subBreeds: ['english', 'french'] }]);
  });

  it('should filter breeds by search term', fakeAsync(() => {
    spyOn(translate, 'instant').and.returnValue('Bulldog');

    component.searchControl.setValue('bul');
    tick(300);
    expect(component.filteredBreeds.length).toBe(1);

    component.searchControl.setValue('invalid');
    tick(300);
    expect(component.filteredBreeds.length).toBe(0);
  }));

  it('should handle empty search term', fakeAsync(() => {
    component.searchControl.setValue('');
    tick(300);
    expect(component.filteredBreeds.length).toBe(1);
  }));

  it('should compare normalized strings correctly', () => {
    expect(component['compareNormalizedStrings']('Café', 'cafe')).toBeTrue();
    expect(component['compareNormalizedStrings']('Dog Breed', 'dogbreed')).toBeTrue();
    expect(component['compareNormalizedStrings']('Hello', 'Bye')).toBeFalse();
  });

  it('should navigate to breed picture without subbreed', () => {
    const spy = spyOn(router, 'navigate');
    component.navigateToBreedPicture('bulldog');
    expect(spy).toHaveBeenCalledWith(['picture', 'bulldog']);
  });

  it('should navigate to breed picture with subbreed', () => {
    const spy = spyOn(router, 'navigate');
    component.navigateToBreedPicture('bulldog', 'english');
    expect(spy).toHaveBeenCalledWith(['picture', 'bulldog', 'english']);
  });
});
