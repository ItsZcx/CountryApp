import { Component } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  public countriesList: Country[] = [];

  // Inject services
  constructor( private countriesService: CountriesService ) { }

  searchByCountry( country: string ):  void {
    this.countriesService.searchCountry( country )
    .subscribe( countries => {
      this.countriesList = countries;
    })
  }

}
