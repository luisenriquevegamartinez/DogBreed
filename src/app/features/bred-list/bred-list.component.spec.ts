import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BredListComponent } from './bred-list.component';
import {
  provideHttpClientTesting,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { provideTranslateTesting } from '../../core/providers/translate-testing.provider';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DogApiServiceMock } from '../../core/api/dog-api.service.mock.test';

describe('BredListComponent', () => {
  let component: BredListComponent;
  let fixture: ComponentFixture<BredListComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
