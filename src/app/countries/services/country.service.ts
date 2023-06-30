import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl:       string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( alphaCode: string ): Observable<Country | null> {
    const url: string = `${ this.apiUrl }/alpha/${ alphaCode }`;

    // Returns FIRST country, in case there is an error --> return a null observable "of(NULL)"
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( () => of(null))
    );
  }

  searchCapital( capitalName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ capitalName }`;

    // Return countries, in case there is an error --> return a new observable empty "of([])"
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]))
    );
  }

  searchCountry( countryName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ countryName }`;

    // same thing above ⬆⬆⬆
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]))
    );
  }

  searchRegion( regionName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ regionName }`;

    // same thing above ⬆⬆⬆
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]))
    );
  }

}

