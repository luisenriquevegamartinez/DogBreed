import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DogApiService } from './dog-api.service';
import { environment } from '../environments/environment';
import { DogBreedLIstDto, ResponseWrapper } from './dog-api.interface';

describe('DogApiService', () => {
  let service: DogApiService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogApiService],
    });
    service = TestBed.inject(DogApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get breeds', () => {
    const mockResponse: ResponseWrapper<DogBreedLIstDto> = {
      message: { beagle: [], bulldog: [] },
      status: 'success',
    };

    service.getBreeds().subscribe((breeds) => {
      expect(breeds).toEqual([
        { name: 'beagle', subBreeds: [] },
        { name: 'bulldog', subBreeds: [] },
      ]);
    });

    const req = httpMock.expectOne(`${apiUrl}/breeds/list/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get sub-breeds', () => {
    const breed = 'bulldog';
    const mockResponse: ResponseWrapper<string[]> = {
      message: ['english', 'french'],
      status: 'success',
    };

    service.getSubBreeds(breed).subscribe((subBreeds) => {
      expect(subBreeds).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/list`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get random image', () => {
    const mockResponse: ResponseWrapper<string> = {
      message: 'random-image.jpg',
      status: 'success',
    };

    service.getRandomImage().subscribe((image) => {
      expect(image).toBe(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breeds/image/random`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get random images', () => {
    const length = 3;
    const mockResponse: ResponseWrapper<string[]> = {
      message: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
      status: 'success',
    };

    service.getRandomImages(length).subscribe((images) => {
      expect(images).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breeds/image/random/${length}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get random image by breed', () => {
    const breed = 'beagle';
    const mockResponse: ResponseWrapper<string> = {
      message: 'beagle-random.jpg',
      status: 'success',
    };

    service.getRandomImageByBreed(breed).subscribe((image) => {
      expect(image).toBe(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/images/random`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get random images by breed', () => {
    const breed = 'beagle';
    const length = 2;
    const mockResponse: ResponseWrapper<string[]> = {
      message: ['img1.jpg', 'img2.jpg'],
      status: 'success',
    };

    service.getRandomImagesByBreed(breed, length).subscribe((images) => {
      expect(images).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/images/random/${length}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get random image by sub-breed', () => {
    const breed = 'bulldog';
    const subBreed = 'english';
    const mockResponse: ResponseWrapper<string> = {
      message: 'bulldog-english.jpg',
      status: 'success',
    };

    service.getRandomImageBySubBreed(breed, subBreed).subscribe((image) => {
      expect(image).toBe(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/${subBreed}/images/random`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get random images by sub-breed', () => {
    const breed = 'bulldog';
    const subBreed = 'english';
    const length = 2;
    const mockResponse: ResponseWrapper<string[]> = {
      message: ['img1.jpg', 'img2.jpg'],
      status: 'success',
    };

    service.getRandomImagesBySubBreed(breed, subBreed, length).subscribe((images) => {
      expect(images).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/${subBreed}/images/random/${length}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get images by breed', () => {
    const breed = 'beagle';
    const mockResponse: ResponseWrapper<string[]> = {
      message: ['beagle1.jpg', 'beagle2.jpg'],
      status: 'success',
    };

    service.getImagesByBreed(breed).subscribe((images) => {
      expect(images).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/images`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get images by sub-breed', () => {
    const breed = 'bulldog';
    const subBreed = 'english';
    const mockResponse: ResponseWrapper<string[]> = {
      message: ['english1.jpg', 'english2.jpg'],
      status: 'success',
    };

    service.getImagesBySubBreed(breed, subBreed).subscribe((images) => {
      expect(images).toEqual(mockResponse.message);
    });

    const req = httpMock.expectOne(`${apiUrl}/breed/${breed}/${subBreed}/images`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
