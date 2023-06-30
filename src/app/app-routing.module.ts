import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

// Declaration of web routes
const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "about",
    component: AboutPageComponent
  },
  {
    path: "contact",
    component: ContactPageComponent
  },
  {
    path: "countries",
    // In case we go to "countries", load the children possible paths from "countries". (Lazy loading)
    loadChildren: () => import("./countries/countries.module").then( xmodule => xmodule.CountriesModule )
  },
  // All other paths redirect to the value of "redirectTo:"
  {
    path: "**", // "**" == whatever you write
    redirectTo: "countries"
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
