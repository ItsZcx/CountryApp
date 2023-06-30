import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countriesList: Country[] = [];
  public isLoading:     boolean = false;

  // Inject services
  constructor( private countriesService: CountriesService ) { };

  searchByRegion( region: string ): void {
    this.isLoading = true;

    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countriesList = countries;
      this.isLoading = false;
  })
  }

}
