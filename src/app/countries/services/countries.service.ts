import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';


  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode(countryCode: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${countryCode}`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries[0] ?? null),
        catchError(() => of(null))
      );
  }

  searchCapital(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${searchTerm}`;
    return this.queryBase(url);
  };

  searchCountry(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${searchTerm}`;
    return this.queryBase(url);
  }

  searchRegion(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${searchTerm}`;
    return this.queryBase(url);
  }

  private queryBase(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.error(error);
          return of([]);
        })
      );
  }
}
