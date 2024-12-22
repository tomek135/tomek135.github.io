import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CalculatorComponent } from '../calculator.component';

type TaxYears = Array<{year: number, podstawaWymiaru: number, przecietneWynagrodzenie: number}>;

@Component({
  selector: 'app-dzialanosc',
  templateUrl: './dzialanosc.component.html',
  styleUrls: ['./dzialanosc.component.css']
})
export class DzialanoscComponent implements OnInit, OnChanges, AfterContentInit, AfterContentChecked, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy{

static PENSION_B2B_PART : number = 19.52;
static SICKNESS_B2B_PART : number = 2.45;
static DISABILITY_B2B_PART : number = 8;
static ACCIDENT_B2B_PART : number = 1.67;
static HEALTHY_B2B_PART_LINIOWY : number = 4.9;
static HEALTHY_B2B_PART_SKALA : number = 9.0;
static EMPLOYMENT_FUND : number = 2.45;
static TOTAL_B2B_PART : number = DzialanoscComponent.PENSION_B2B_PART + DzialanoscComponent.SICKNESS_B2B_PART + 
DzialanoscComponent.DISABILITY_B2B_PART + DzialanoscComponent.ACCIDENT_B2B_PART + DzialanoscComponent.EMPLOYMENT_FUND;

  taxYears: TaxYears;
  contractsType: any[];
  skEmerytalnaDzialanosc: number = 0;
  skRentowaDzialanosc: number = 0;
  skChorobowaDzialanosc: number = 0;
  skWypadkowaDzialanosc: number = 0;
  skFunduszPracyDzialalnosc: number = 0;
  razemDzialanoscZUS: number= 0;
  
  contributions: any[] = [];
  
  errors: boolean = true;
  
  basedParameters = {
    accidentContributionPercent: 0.67,
    grossIncome: 0,
    netIncome: 0,
    increasedIncomeCost: 0,
    totalEmployerCosts: 0,
    contractType: ''
  };

  healthyContributions = {
    baseOfHealthyContribution: 0,
    valueInPercent: 0, 
    valueInZl: 0
  };
  
  taxContributions = {
    incomeCost: 0,
    middleClassRelief: 0,
    baseOfTax: 0,
    tax: 0,
    taxFreeAmount: 0, 
    taxFreeHealthyPart: 0,
    advanceTax: 0 
  };
  
  summaryParameters ={
    zusPercent: 0,
    nfzPercent: 0,
    taxPercent: 0,
    netIncomePercent: 0,
    employerPercent: 0
  }
  
  employerContributions={
    fgsp: 0,
    labourFund: 0
  }
  


  skladkiZUS = [
  {
    id: "1",
    value: "Ulga na start",
    podstawaWymiaru: 0
  },
  {
    id: "2",
    value: "Mały ZUS",
    podstawaWymiaru: 0.3
  },
  {
    id: "3",
    value: "Mały ZUS plus",
    podstawaWymiaru: 0.3
  },
  {
    id: "4",
    value: "Pełny ZUS",
    podstawaWymiaru: 1
  }
  ];

  taxType = [ 
    { 
      id: 1,
      value: "Skala podatkowa 12% / 32%"
    },
    { 
      id: 2,
      value: "Podatek liniowy 19%"
    },
    { 
      id: 3,
      value: "Ryczałt"
    }
  ];

  ryczalt=['8.5%','12%','15%','17%'];
  ryczaltValue: string = '';

  tax: any = null;
  selectedCategory: any = null;
  selectedYear: any = null;


  ngOnChanges(){
    console.log("ngOnChanges")
  }
  ngOnInit(){
    //console.log("ngOnInit")
  }
  ngDoCheck(){
    //console.log("ngDoCheck")
  }
  ngAfterContentInit(){
    //console.log("ngAfterContentInit")
  }
  
  ngAfterViewInit(){
    //console.log("ngAfterViewInit")
  }

  ngAfterContentChecked(){
    ///console.log("ngAfterContentChecked")
  }
  ngAfterViewChecked(){
    //console.log("ngAfterViewChecked")
  }
  ngOnDestroy(){
    //console.log("ngOnDestroy")
  }

  constructor() {    
    this.taxYears = [
      {
        year: 2024,
        podstawaWymiaru: 4694.4,
        przecietneWynagrodzenie: 7767.85

      },
      {
        year: 2025,
        podstawaWymiaru: 5203.8,
        przecietneWynagrodzenie: 8400.85
      }
    ]
    ;
  
    this.contractsType = ['Umowa o Pracę', 'Działalnośc Gospodarcza'];
    this.basedParameters.contractType = 'Działalnośc Gospodarcza';
    this.contributions = [
      {
        contribution: 'Emerytalne', 
        valueInPercent: DzialanoscComponent.PENSION_B2B_PART, 
        podstawaWymiaru:  this.selectedCategory?.podstawaWymiaru,
        valueInZl: this.skEmerytalnaDzialanosc,
      },
      {
        contribution: 'Rentowe', 
        valueInPercent: DzialanoscComponent.DISABILITY_B2B_PART, 
        podstawaWymiaru: this.selectedCategory?.podstawaWymiaru, 
        valueInZl: this.skRentowaDzialanosc
      },
      {
        contribution: 'Chorobowe', 
        valueInPercent: DzialanoscComponent.SICKNESS_B2B_PART, 
        podstawaWymiaru:  this.selectedCategory?.podstawaWymiaru, 
        valueInZl: this.skChorobowaDzialanosc
      },
      {
        contribution: 'Wypadkowe', 
        valueInPercent: DzialanoscComponent.ACCIDENT_B2B_PART, 
        podstawaWymiaru: this.selectedCategory?.podstawaWymiaru, 
        valueInZl: this.skWypadkowaDzialanosc
      },
      {
        contribution: 'Fundusz Pracy', 
        valueInPercent: DzialanoscComponent.EMPLOYMENT_FUND, 
        podstawaWymiaru: this.selectedCategory?.podstawaWymiaru, 
        valueInZl: this.skFunduszPracyDzialalnosc
      }
  ];
  
  }
  
  get totalB2BPart(){
    return DzialanoscComponent.TOTAL_B2B_PART;
  }

obliczKwoty(){
  console.log("test")
    if(this.checkValidation()){
      var podstawaWymiaru = this.selectedYear.podstawaWymiaru * this.selectedCategory.podstawaWymiaru ;
      this.calculateZUSContributions(podstawaWymiaru);
      this.calculateHealthyContributions();

      this.calculateTaxContributions_2022();

      this.calculateSummaryParameters();
      this.contributions = [
        {
          contribution: 'Emerytalne', 
          valueInPercent: DzialanoscComponent.PENSION_B2B_PART, 
          podstawaWymiaru: podstawaWymiaru,
          valueInZl: this.skEmerytalnaDzialanosc,
        },
        {
          contribution: 'Rentowe', 
          valueInPercent: DzialanoscComponent.DISABILITY_B2B_PART, 
          podstawaWymiaru: podstawaWymiaru,
          valueInZl: this.skRentowaDzialanosc
        },
        {
          contribution: 'Chorobowe', 
          valueInPercent: DzialanoscComponent.SICKNESS_B2B_PART, 
          podstawaWymiaru: podstawaWymiaru,
          valueInZl: this.skChorobowaDzialanosc
        },
        {
          contribution: 'Wypadkowe', 
          valueInPercent: DzialanoscComponent.ACCIDENT_B2B_PART, 
          podstawaWymiaru: podstawaWymiaru,
          valueInZl: this.skWypadkowaDzialanosc
        },
        {
          contribution: 'Fundusz Pracy', 
          valueInPercent: DzialanoscComponent.EMPLOYMENT_FUND, 
          podstawaWymiaru: podstawaWymiaru,
          valueInZl: this.skFunduszPracyDzialalnosc
        }
      ];
    } 
  
    }
  
  dajKwoteNetto(): number {
      var kwota = this.basedParameters.grossIncome
                  -this.healthyContributions.valueInZl
                  -this.razemDzialanoscZUS
                  -this.taxContributions.advanceTax;
      return Math.round(kwota*100)/100; 
    }
  
  
  
  private obliczPodstaweOpodatkowania(){
    var wyliczonaKwota: number = 0;
    wyliczonaKwota = this.basedParameters.grossIncome 
      - this.razemDzialanoscZUS
      - this.taxContributions.incomeCost
      - this.taxContributions.middleClassRelief;
      if(wyliczonaKwota<0)
      wyliczonaKwota = 0;
      return Math.round(wyliczonaKwota);
  }
  
  
  private calculateHealthyContributions(){
    if(this.tax.id == 1){
      this.healthyContributions.baseOfHealthyContribution =  this.basedParameters.grossIncome;
      this.healthyContributions.valueInPercent = DzialanoscComponent.HEALTHY_B2B_PART_SKALA;
    } else if(this.tax.id == 2){
      this.healthyContributions.baseOfHealthyContribution =  this.basedParameters.grossIncome;
      this.healthyContributions.valueInPercent = DzialanoscComponent.HEALTHY_B2B_PART_LINIOWY;
    } else {
      var healthyContributionsPart = 0.6;
      if(this.basedParameters.grossIncome > 5000 && this.basedParameters.grossIncome < 25000) {
        healthyContributionsPart = 1
      } else {
        healthyContributionsPart = 1.8
      }

      this.healthyContributions.baseOfHealthyContribution = Math.round(this.selectedYear.przecietneWynagrodzenie*healthyContributionsPart*100)/100;
      this.healthyContributions.valueInPercent = DzialanoscComponent.HEALTHY_B2B_PART_SKALA;
    }
    this.healthyContributions.valueInZl = Math.round(this.healthyContributions.baseOfHealthyContribution*this.healthyContributions.valueInPercent)/100;
  }
  
  private calculateZUSContributions(podstawa :number){
    this.skEmerytalnaDzialanosc = Math.round(DzialanoscComponent.PENSION_B2B_PART*podstawa)/100;
    this.skChorobowaDzialanosc =Math.round( DzialanoscComponent.SICKNESS_B2B_PART*podstawa)/100;
    this.skRentowaDzialanosc = Math.round(DzialanoscComponent.DISABILITY_B2B_PART*podstawa)/100;
    this.skWypadkowaDzialanosc = Math.round(DzialanoscComponent.ACCIDENT_B2B_PART*podstawa)/100;
    this.skFunduszPracyDzialalnosc = Math.round(DzialanoscComponent.EMPLOYMENT_FUND*podstawa)/100;
    this.razemDzialanoscZUS = Math.round((this.skEmerytalnaDzialanosc + this.skRentowaDzialanosc + this.skChorobowaDzialanosc + this.skWypadkowaDzialanosc + this.skFunduszPracyDzialalnosc)*100)/100;
  }
  
  private calculateTaxContributions_2022(){
    this.taxContributions.baseOfTax = this.obliczPodstaweOpodatkowania();
    this.taxContributions.tax = Math.round(this.taxContributions.baseOfTax*12/100);
    this.taxContributions.taxFreeHealthyPart= 0;
    this.taxContributions.advanceTax = Math.round((this.taxContributions.tax - this.taxContributions.taxFreeAmount)*100)/100;

  }
  
  
  private calculateSummaryParameters(){
    if(this.basedParameters.grossIncome > 0){
      this.summaryParameters.netIncomePercent = Math.round((this.basedParameters.netIncome/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.zusPercent = Math.round((this.razemDzialanoscZUS/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.nfzPercent = Math.round((this.healthyContributions.valueInZl/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.taxPercent = Math.round((this.taxContributions.advanceTax/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employerPercent = Math.round((this.basedParameters.totalEmployerCosts/this.basedParameters.grossIncome)*10000)/100;
    }
  }
  
  private checkValidation() : boolean{
    console.log(this.basedParameters);
    if(this.selectedYear == null 
      || this.basedParameters.contractType === ''
      || this.basedParameters.grossIncome == null 
      || this.tax == null 
      || this.selectedCategory == null){
      this.errors=true;
      return false;
    }
     this.errors=false;
     return true;
  }
  

  
}
