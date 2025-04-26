import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import {
  DogBreedLIst as DogBreedList,
  ResponseWrapper,
} from './dog-api.interface';

@Injectable({
  providedIn: 'root',
})
export class DogApiService {
  private readonly apiUrl = environment.apiUrl;
  private http: HttpClient = inject(HttpClient);

  getBreeds(): Observable<DogBreedList> {
    return this.http
      .get<ResponseWrapper<DogBreedList>>(`${this.apiUrl}/breeds/list/all`)
      .pipe(map((response: any) => response.message));
  }

  getSubBreeds(breed: string): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(`${this.apiUrl}/breed/${breed}/list`)
      .pipe(map((response: any) => response.message));
  }

  getRandomImage(): Observable<string> {
    return this.http
      .get<ResponseWrapper<string>>(`${this.apiUrl}/breeds/image/random`)
      .pipe(map((response: any) => response.message));
  }

  getRandomImages(length: number): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breeds/image/random/${length}`
      )
      .pipe(map((response: any) => response.message));
  }

  getRandomImageByBreed(breed: string): Observable<string> {
    return this.http
      .get<ResponseWrapper<string>>(
        `${this.apiUrl}/breed/${breed}/images/random`
      )
      .pipe(map((response: any) => response.message));
  }

  getRandomImagesByBreed(breed: string, length: number): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breed/${breed}/images/random/${length}`
      )
      .pipe(map((response: any) => response.message));
  }

  getRandomImageBySubBreed(
    breed: string,
    subBreed: string
  ): Observable<string> {
    return this.http
      .get<ResponseWrapper<string>>(
        `${this.apiUrl}/breed/${breed}/${subBreed}/images/random`
      )
      .pipe(map((response: any) => response.message));
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
      .pipe(map((response: any) => response.message));
  }

  getImagesByBreed(breed: string): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(`${this.apiUrl}/breed/${breed}/images`)
      .pipe(map((response: any) => response.message));
  }

  getImagesBySubBreed(breed: string, subBreed: string): Observable<string[]> {
    return this.http
      .get<ResponseWrapper<string[]>>(
        `${this.apiUrl}/breed/${breed}/${subBreed}/images`
      )
      .pipe(map((response: any) => response.message));
  }
}
