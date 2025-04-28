import { of } from 'rxjs';
import { DogApiService } from './dog-api.service';

export const DogApiServiceMock = {
  provide: DogApiService,
  useValue: {
    getBreeds: () => of([{ name: 'bulldog', subBreeds: ['english', 'french'] }]),
    getSubBreeds: () => of(['english']),
    getRandomImage: () => of('mocked-image-url'),
    getRandomImages: () => of('mocked-image-url'),
    getRandomImageByBreed: () => of('mocked-image-url'),
    getRandomImagesByBreed: () => of('mocked-image-url'),
    getRandomImageBySubBreed: () => of('mocked-image-url'),
    getRandomImagesBySubBreed: () => of('mocked-image-url'),
  },
};
