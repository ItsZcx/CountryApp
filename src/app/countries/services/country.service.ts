import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  // Return countries, in case there is an error --> return a new observable empty "of([])"
  private returnCountryRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([])),
      delay(500), // Added delay just to show a loading animation
    );
  }

  // Returns FIRST country, in case there is an error --> return a null observable "of(NULL)"
  searchCountryByAlphaCode( alphaCode: string ): Observable<Country | null> {
    const url: string = `${ this.apiUrl }/alpha/${ alphaCode }`;

    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( () => of(null))
    );
  }

  // Returns countries searched by capital
  searchCapital( capitalName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ capitalName }`;

    return this.returnCountryRequest(url);
  }

  // Returns countries searched by name
  searchCountry( countryName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ countryName }`;

    return this.returnCountryRequest(url);
  }

  // Returns countries searched by region
  searchRegion( regionName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ regionName }`;

    return this.returnCountryRequest(url);
  }

}

