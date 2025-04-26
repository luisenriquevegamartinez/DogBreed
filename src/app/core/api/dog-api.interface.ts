export interface ResponseWrapper<T> {
  message: T;
  status: 'success' | 'error';
}

export interface DogBreedLIstDto {
  [dogBreed: string]: string[];
}

export interface DogBreedModel {
  name: string;
  subBreeds: string[];
};
