export interface ResponseWrapper<T> {
  message: T;
  status: 'success' | 'error';
}

export type DogBreedLIstDto = Record<string, string[]>;

export interface DogBreedModel {
  name: string;
  subBreeds: string[];
};
