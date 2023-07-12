import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [], },
    byRegion: { region: '', countries: [], },
    byCountry: { term: '', countries: [], },
  };


  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

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
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: searchTerm, countries: countries }),
        tap(() => this.saveToLocalStorage()),
      )
  };

  searchCountry(searchTerm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${searchTerm}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term: searchTerm, countries: countries }),
        tap(() => this.saveToLocalStorage()),
      )
  }

  searchRegion(searchTerm: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${searchTerm}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region: searchTerm, countries: countries }),
        tap(() => this.saveToLocalStorage()),
      )
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        // delay(2000),
        catchError(() => of([]))
      );
  }
}
