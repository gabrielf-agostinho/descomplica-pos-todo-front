import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MainComponent
  ]
})
export class LayoutModule { }
