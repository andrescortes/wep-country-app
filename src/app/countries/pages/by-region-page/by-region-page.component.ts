import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
    ` img {
      width: 35px;
    }`
  ]
})
export class ByRegionPageComponent implements OnInit {
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public seletedRegion?: Region;

  constructor(private readonly countryService: CountriesService) { }
  ngOnInit(): void {
    this.countries = this.countryService.cacheStore.byRegion.countries;
    this.seletedRegion = this.countryService.cacheStore.byRegion.region;
  }

  searchByRegion(region: Region): void {
    this.seletedRegion = region;
    this.countryService.searchRegion(region)
      .subscribe((countries: Country[]) => {
        this.countries = countries;
      });
  }
}
