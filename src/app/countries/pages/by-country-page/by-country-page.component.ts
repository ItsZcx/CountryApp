import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countriesList: Country[] = [];
  public isLoading:     boolean = false;
  public storedValue:   string = "";

  // Inject services
  constructor( private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.countriesList = this.countriesService.cacheStorage.byCountry.countries;
    this.storedValue = this.countriesService.cacheStorage.byCountry.value;
  }

  searchByCountry( country: string ):  void {
    this.isLoading = true;

    this.countriesService.searchCountry( country )
    .subscribe( countries => {
      this.countriesList = countries;
      this.isLoading = false;
    })
  }

}
