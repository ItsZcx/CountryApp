import { Component } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countriesList: Country[] = [];

  // Injection of the service
  constructor( private countriesService: CountriesService ) { }

  // Calls service to get specific url and then subscribes to be able to see the recived elements
  searchByCapital( capital: string ): void {
    this.countriesService.searchCapital( capital )
    .subscribe( countries => {
      this.countriesList = countries;
    })
  }

}
