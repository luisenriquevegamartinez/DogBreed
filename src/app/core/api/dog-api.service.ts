import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import {
  DogBreedLIstDto,
  DogBreedModel,
  ResponseWrapper,
} from './dog-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DogApiService {
  private readonly apiUrl = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getBreeds(): Observable<DogBreedModel[]> {
    return this.http
      .get<ResponseWrapper<DogBreedLIstDto>>(`${this.apiUrl}/breeds/list/all`)
      .pipe(
        map((response) =>
          Object.entries(response.message).map(([name, subBreeds]) => ({
            name,
            subBreeds,
          }))
        )
      );
  }

  getSubBreeds(breed: string): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(`${this.apiUrl}/breed/${breed}/list`)
      .pipe(map((response) => response.message));
  }

  getRandomImage(): Observable<string> {
    return this.http
      .get<ResponseWrapper<string>>(`${this.apiUrl}/breeds/image/random`)
      .pipe(map((response) => response.message));
  }

  getRandomImages(length: number): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breeds/image/random/${length}`
      )
      .pipe(map((response) => response.message));
  }

  getRandomImageByBreed(breed: string): Observable<string> {
    return this.http
      .get<ResponseWrapper<string>>(
        `${this.apiUrl}/breed/${breed}/images/random`
      )
      .pipe(map((response) => response.message));
  }

  getRandomImagesByBreed(breed: string, length: number): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breed/${breed}/images/random/${length}`
      )
      .pipe(map((response) => response.message));
  }

  getRandomImageBySubBreed(
    breed: string,
    subBreed: string
  ): Observable<string> {
    return this.http
      .get<ResponseWrapper<string>>(
        `${this.apiUrl}/breed/${breed}/${subBreed}/images/random`
      )
      .pipe(map((response) => response.message));
  }

  getRandomImagesBySubBreed(
    breed: string,
    subBreed: string,
    length: number
  ): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breed/${breed}/${subBreed}/images/random/${length}`
      )
      .pipe(map((response) => response.message));
  }

  getImagesByBreed(breed: string): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(`${this.apiUrl}/breed/${breed}/images`)
      .pipe(map((response) => response.message));
  }

  getImagesBySubBreed(breed: string, subBreed: string): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breed/${breed}/${subBreed}/images`
      )
      .pipe(map((response) => response.message));
  }
}
