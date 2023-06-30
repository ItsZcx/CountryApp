import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStorage {
  byRegion:   TermRegion;
  byCapital: TermCountries;
  byCountry:  TermCountries;
}

export interface TermCountries {
  value:     string;
  countries: Country[];
}

export interface TermRegion {
  region:     Region;
  countries: Country[];
}
