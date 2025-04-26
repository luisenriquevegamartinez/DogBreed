export interface ResponseWrapper<T> {
  message: T;
  status: 'success' | 'error';
}


export interface DogBreedLIst {
  [dogBreed: string]: string[];
}

