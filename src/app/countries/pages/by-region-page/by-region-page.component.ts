import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/country.service';

type Region = "Americas" | "Oceania" | "Europe" | "Asia" | "Africa";

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public currentRegion?: Region;
  public countriesList:  Country[] = [];
  public isLoading:      boolean = false;
  public regions: Region[] = ["Europe", "Africa", "Americas", "Asia", "Oceania"];

  // Inject services
  constructor( private countriesService: CountriesService ) { };

  searchByRegion( region: Region ): void {
    this.isLoading = true;
    this.currentRegion = region;

    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countriesList = countries;
      this.isLoading = false;
  })
  }

}
