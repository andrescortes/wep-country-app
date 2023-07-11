import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
    ` img {
      width: 35px;
    }`
  ]
})
export class ByRegionPageComponent {
  public countries: Country[] = [];

  constructor(private readonly countryService: CountriesService) { }

  searchByRegion(region: string): void {
    this.countryService.searchRegion(region)
      .subscribe((countries: Country[]) => {
        this.countries = countries;
        console.log({ countries });
      });
  }
}
