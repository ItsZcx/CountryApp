import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  public currentRegion?: Region;
  public countriesList:  Country[] = [];
  public isLoading:      boolean = false;
  public regions:        Region[] = ["Europe", "Africa", "Americas", "Asia", "Oceania"];

  // Inject services
  constructor( private countriesService: CountriesService ) { };

  ngOnInit(): void {
    this.countriesList = this.countriesService.cacheStorage.byRegion.countries;
    this.currentRegion = this.countriesService.cacheStorage.byRegion.region;
  }

  searchByRegion( region: Region ): void {
    this.isLoading = true;
    this.currentRegion = region;

    this.countriesService.searchRegion( region )
    .subscribe( countries => {
      this.countriesList = countries;
      this.isLoading = false;
    });
  }

}
