import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
    ` img {
      width: 35px;
    }`
  ]
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private readonly countryService: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byCountry.countries;
    this.initialValue = this.countryService.cacheStore.byCountry.term;
  }

  searchByCountry(country: string): void {
    this.countryService.searchCountry(country)
      .subscribe((countries: Country[]) => {
        this.countries = countries;
        console.log({ countries });
      });
  }
}
