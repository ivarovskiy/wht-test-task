import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ICat } from '../models/cat';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class CatApiService {
  private apiBaseUrl = 'https://api.thecatapi.com/v1';
  private apiKey =
    'live_sYvEzoC7srjYI4lls10xw7XKYp9VhKxbYIPMcs9NqqlpWWgZksEGGaiJyCjj0gGC';

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  getCatById(id: string | null): Observable<ICat> {
    const params = new HttpParams().set('api_key', this.apiKey);

    const url = `${this.apiBaseUrl}/images/${id}`;
    return this.http.get<ICat>(url, { params }).pipe(
      catchError(error => {
        console.error('Error fetching cat by ID:', error);
        return throwError('Failed to fetch cat by ID');
      })
    );
  }

  fetchBreedNames(): Observable<any[]> {
    const params = new HttpParams().set('api_key', this.apiKey);

    const url = `${this.apiBaseUrl}/breeds`;
    return this.http.get<any[]>(url, { params }).pipe(
      map(breeds => breeds.map(breed => ({ id: breed.id, name: breed.name }))),
      catchError(error => {
        console.error('Error fetching breed names:', error);
        return throwError('Failed to fetch breed names');
      })
    );
  }

  fetchCatsFromApi(
    limit: string | null | undefined,
    breedId: string | null | undefined
  ): Observable<ICat[]> {
    let params = new HttpParams();

    if (limit && limit !== null) {
      params = new HttpParams()
        .set('limit', limit.toString())
        .set('has_breeds', 1)
        .set('api_key', this.apiKey);
    }

    if (breedId && breedId !== 'all' && breedId !== null) {
      params = params.set('breed_ids', breedId);
    }

    const url = `${this.apiBaseUrl}/images/search`;
    return this.http.get<ICat[]>(url, { params }).pipe(
      catchError(error => {
        console.error('Error fetching cats from API:', error);
        return throwError('Failed to fetch cats from API');
      })
    );
  }
}
