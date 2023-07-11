import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor( private readonly countryService: CountriesService) { }

  searchByCapital(capital: string): void {
    this.countryService.searchCapital(capital)
    .subscribe((countries: Country[]) => {
      this.countries = countries;
      console.log({countries});
    });
  }

}
