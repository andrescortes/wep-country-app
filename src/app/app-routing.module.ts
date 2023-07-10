import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/shared/pages/contact-page/contact-page.component';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule) },
  { path: '**', redirectTo: 'home' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
  providers: [],
})
export class AppRoutingModule { }
