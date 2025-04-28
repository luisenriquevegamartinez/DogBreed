import { TestBed, fakeAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTranslateTesting } from './core/providers/translate-testing.provider';
import { environment } from './core/environments/environment';
import { Language } from './core/enums/language';

describe('AppComponent', () => {
  let component: AppComponent;
  let translate: TranslateService;
  let router: Router;
  let urlSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClientTesting(),
        provideTranslateTesting(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    router = TestBed.inject(Router);
    translate.use(environment.defaultLanguage);
    urlSpy = spyOnProperty(router, 'url', 'get');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language correctly', () => {
    const spyTranslate = spyOn(translate, 'use');

    expect(component['currentLang']).toBe(environment.defaultLanguage);

    component.switchLanguage();
    expect(spyTranslate).toHaveBeenCalledWith(
      environment.defaultLanguage === Language.Spanish
        ? Language.English
        : Language.Spanish
    );

    component.switchLanguage();
    expect(spyTranslate).toHaveBeenCalledWith(environment.defaultLanguage);
  });

  it('should show back button conditionally', () => {
    urlSpy.and.returnValue('/list');
    expect(component.shouldShowBackButton()).toBeFalse();

    urlSpy.and.returnValue('/other-route');
    expect(component.shouldShowBackButton()).toBeTrue();
  });

  it('should navigate to home', () => {
    const spyNavigate = spyOn(router, 'navigate');
    component.goHome();
    expect(spyNavigate).toHaveBeenCalledWith(['list']);
  });

  it('should update back button visibility on route changes', fakeAsync(() => {
    urlSpy.and.returnValue('/list');
    component.isBackButtonVisible = component.shouldShowBackButton();
    expect(component.isBackButtonVisible).toBeFalse();

    urlSpy.and.returnValue('/other-route');
    component.isBackButtonVisible = component.shouldShowBackButton();
    expect(component.isBackButtonVisible).toBeTrue();
  }));

  it('should initialize with default language', () => {
    expect(component['currentLang']).toEqual(environment.defaultLanguage);
    expect(translate.currentLang).toBe(environment.defaultLanguage);
  });
});
