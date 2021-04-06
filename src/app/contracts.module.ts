import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ContractsComponent } from './contracts.component';
import { ContractComponent } from './contract/contract.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContractsComponent,
    ContractComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ContractsComponent]
})
export class ContractsModule { }
