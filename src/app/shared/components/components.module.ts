import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorHandlerComponent } from './validator-handler/validator-handler.component';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ValidatorHandlerComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    ValidatorHandlerComponent
  ]
})
export class ComponentsModule { }
