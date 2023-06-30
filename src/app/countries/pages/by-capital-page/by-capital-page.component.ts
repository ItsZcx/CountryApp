import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countriesList: Country[] = [];
  public isLoading:     boolean = false;
  public storedValue:   string = "";

  // Inject services
  constructor( private countriesService: CountriesService ) { }

  ngOnInit(): void {
    this.countriesList = this.countriesService.cacheStorage.byCapital.countries;
    this.storedValue = this.countriesService.cacheStorage.byCapital.value;
  }

  // Calls service to get specific url and then subscribes to be able to see the recived elements
  searchByCapital( capital: string ): void {
    this.isLoading = true;

    this.countriesService.searchCapital( capital )
    .subscribe( countries => {
      this.countriesList = countries;
      this.isLoading = false;
  })
  }

}
