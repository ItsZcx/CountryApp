import { CacheStorage } from '../interfaces/cache-storage.interface';
import { Country } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  // Object that works as a local storage to keep previous search
  public cacheStorage: CacheStorage = {
    byRegion:   { region: "", countries: [] },
    byCountry:  { value:  "", countries: [] },
    byCapital: { value:  "", countries: [] },
  }

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

  // Returns countries searched by capital and stores both the string and the countries to cacheStorage
  searchCapital( capitalName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/capital/${ capitalName }`;

    return this.returnCountryRequest(url)
    .pipe(
      tap( funcCountries => this.cacheStorage.byCapital = { value: capitalName, countries: funcCountries } )
      // If the var from the object has the same name as the function one you can do this  ⬇⬇⬇⬇
      //          tap( countries => this.cacheStorage.byCapital = { value: capitalName, countries } )
    );
  }

  // Returns countries searched by name and stores both the string and the countries to cacheStorage
  searchCountry( countryName: string ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/name/${ countryName }`;

    return this.returnCountryRequest(url)
    .pipe(
      tap( funcCountries => this.cacheStorage.byCountry = { value: countryName, countries: funcCountries } )
    );
  }

  // Returns countries searched by region and stores both the string and the countries to cacheStorage
  searchRegion( regionName: Region ): Observable<Country[]> {
    const url: string = `${ this.apiUrl }/region/${ regionName }`;

    return this.returnCountryRequest(url)
    .pipe(
      tap( funcCountries => this.cacheStorage.byRegion = { region: regionName, countries: funcCountries } )
    );
  }

}

