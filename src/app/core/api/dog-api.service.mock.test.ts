export const DogApiServiceMock = {
  provide: 'DogApiService',
  useValue: {
    getBreeds: () => [],
    getSubBreeds: () => [],
    getRandomImage: () => [],
    getRandomImages: () => [],
    getRandomImageByBreed: () => [],
    getRandomImagesByBreed: () => [],
  },
};
