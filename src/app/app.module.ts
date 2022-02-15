import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { AppComponent } from './components/app/app.component';
import { InputNumberModule} from 'primeng/inputnumber';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule} from 'primeng/dropdown';
import { CheckboxModule} from 'primeng/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TableModule} from 'primeng/table';
import { SplitterModule} from 'primeng/splitter';
import { CardModule} from 'primeng/card';
import { TabViewModule} from 'primeng/tabview';
import { UmowaOPraceComponent } from './components/calculator/umowa-oprace/umowa-oprace.component';
import { DzialanoscComponent } from './components/calculator/dzialanosc/dzialanosc.component';
import { RadioButtonModule} from 'primeng/radiobutton';
import { UopSummaryComponent } from './components/calculator/umowa-oprace/uop-summary/uop-summary.component';
import { DzialalnoscSummaryComponent } from './components/calculator/dzialanosc/dzialalnosc-summary/dzialalnosc-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    UmowaOPraceComponent,
    DzialanoscComponent,
    UopSummaryComponent,
    DzialalnoscSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    CommonModule,
    FormsModule,
    InputNumberModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    SplitterModule,
    TabViewModule,
    DropdownModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CardModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
