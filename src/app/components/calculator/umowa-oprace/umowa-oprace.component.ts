import { Component } from '@angular/core';

@Component({
  selector: 'app-umowa-oprace',
  templateUrl: './umowa-oprace.component.html',
  styleUrls: ['./umowa-oprace.component.css']
})
export class UmowaOPraceComponent {

  static PENSION_EMPLOYEE_PART : number = 9.76;
  static PENSION_EMPLOYER_PART : number = 9.76;
  static SICKNESS_EMPLOYEE_PART : number = 2.45;
  static DISABILITY_EMPLOYEE_PART : number = 1.5;
  static DISABILITY_EMPLOYER_PART : number = 6.5;
  static HEALTHY_EMPLOYEE_PART : number = 9.0;
  static FIRST_TAX_RATE_2021: number = 17;
  static FIRST_TAX_RATE_2022: number = 12;
  static SECOND_TAX_RATE: number = 32;
  static MAX_BASE_PENSION_PART : number = 177660;
  static TOTAL_EMPLOYEE_PART : number = UmowaOPraceComponent.DISABILITY_EMPLOYEE_PART + UmowaOPraceComponent.PENSION_EMPLOYEE_PART + UmowaOPraceComponent.SICKNESS_EMPLOYEE_PART;
  static TOTAL_EMPLOYER_PART : number = UmowaOPraceComponent.DISABILITY_EMPLOYER_PART + UmowaOPraceComponent.PENSION_EMPLOYER_PART ;
  taxYears: any[];
  contractsType: any[];
  skEmerytalnaPracownik: number= 0;
  skRentowaPracownik: number= 0;
  skRentowaPracodawca: number= 0;
  skChorobowaPracownik: number= 0;
  skEmerytalnaPracodawca: number= 0;
  skWypadkowaPracodawca: number= 0;
  razemPracodawcaZUS: number =0;
  razemPracownikZUS: number= 0;
  
  contributions: any[] = [];
  
  errors: boolean = true;
  
  basedParameters = {
    accidentContributionPercent: 0.67,
    authorRightsPercent: 0,
    grossIncome: 0,
    additionalBenefits: 0,
    netIncome: 0,
    increasedIncomeCost: 0,
    totalEmployerCosts: 0,
    isPPK: false,
    isAuthorRights: false,
    isTaxFreeAmount: false,
    isUnder26Age: false,
    isWorkOutsideHome: false,
    isNowyLad: false,
    contractType: '',
    taxYear: 0
  };
  
  ppkParameters = {
    employeeContributionPercent: 2,
    employerContributionPercent: 1.5,
    addEmployeeContributionPercent: 0,
    addEmployerContributionPercent: 0,
    ppkEmployeeAmount: 0,
    ppkEmployerAmount: 0
  };
  
  healthyContributions = {
    baseOfHealthyContribution: 0,
    employeePart: UmowaOPraceComponent.HEALTHY_EMPLOYEE_PART, 
    employeeValue: 0
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
    employee: {
      zusPercent: 0,
      nfzPercent: 0,
      ppkPercent: 0,
      taxPercent: 0
    },
    employer: {
      zusPercent: 0,
      ppkPercent: 0,
      fgspPercent: 0,
      labourFundPercent: 0
    },
    netIncomePercent: 0,
    employerPercent: 0
  }
  
  employerContributions={
    fgsp: 0,
    labourFund: 0
  }
  
  months: any[] = [
    {
      month_number: 1,
      month_string: "Styczeń",
      pension_part: this.getMonthlyPensionPart(1),
      disability_part:  this.getMonthlyDisabilityPart(1)
    },
    {
      month_number: 2,
      month_string: "Luty",
      pension_part: this.getMonthlyPensionPart(2),
      disability_part: this.getMonthlyDisabilityPart(2)
    },
    {
      month_number: 3,
      month_string: "Marzec",
      pension_part: this.getMonthlyPensionPart(3),
      disability_part: this.getMonthlyDisabilityPart(3)
    },
    {
      month_number: 4,
      month_string: "Kwiecień",
      pension_part: this.getMonthlyPensionPart(4),
      disability_part: this.getMonthlyDisabilityPart(4)
    },
    {
      month_number: 5,
      month_string: "Maj",
      pension_part: this.getMonthlyPensionPart(5),
      disability_part: this.getMonthlyDisabilityPart(5)
    },
    {
      month_number: 6,
      month_string: "Czerwiec",
      pension_part: this.getMonthlyPensionPart(6),
      disability_part: this.getMonthlyDisabilityPart(6)
    },
    {
      month_number: 7,
      month_string: "Lipiec",
      pension_part: this.getMonthlyPensionPart(7),
      disability_part: this.getMonthlyDisabilityPart(7)
    },
    {
      month_number: 8,
      month_string: "Sierpień",
      pension_part: this.getMonthlyPensionPart(8),
      disability_part: this.getMonthlyDisabilityPart(8)
    },
    {
      month_number: 9,
      month_string: "Wrzesień",
      pension_part: this.getMonthlyPensionPart(9),
      disability_part: this.getMonthlyDisabilityPart(9)
    },
    {
      month_number: 10,
      month_string: "Październik",
      pension_part: this.getMonthlyPensionPart(10),
      disability_part: this.getMonthlyDisabilityPart(10)
    },
    {
      month_number: 11,
      month_string: "Listopad",
      pension_part: this.getMonthlyPensionPart(11),
      disability_part: this.getMonthlyDisabilityPart(11)
    },
    {
      month_number: 12,
      month_string: "Grudzień",
      pension_part: this.getMonthlyPensionPart(12),
      disability_part: this.getMonthlyDisabilityPart(12)
    }
  ];
  
  
  constructor(){
    this.taxYears = [2024, 2025];
    this.contractsType = ['Umowa o Pracę', 'Działalnośc Gospodarcza'];
    this.basedParameters.contractType = 'Umowa o Pracę';
    this.contributions = [
      {
        contribution: 'Emerytalne', 
        employeePart: UmowaOPraceComponent.PENSION_EMPLOYEE_PART, 
        employeeValue: this.skEmerytalnaPracownik, 
        employerPart: UmowaOPraceComponent.PENSION_EMPLOYER_PART, 
        employerValue: this.skEmerytalnaPracodawca,
      },
      {
        contribution: 'Rentowe', 
        employeePart: UmowaOPraceComponent.DISABILITY_EMPLOYEE_PART, 
        employeeValue: this.skRentowaPracownik, 
        employerPart: UmowaOPraceComponent.DISABILITY_EMPLOYER_PART, 
        employerValue: this.skRentowaPracodawca
      },
      {
        contribution: 'Chorobowe', 
        employeePart: UmowaOPraceComponent.SICKNESS_EMPLOYEE_PART, 
        employeeValue: this.skChorobowaPracownik, 
        employerPart: 0, 
        employerValue: 0
      },
      {
        contribution: 'Wypadkowe', 
        employeePart: 0, 
        employeeValue: 0, 
        employerPart: this.basedParameters.accidentContributionPercent, 
        employerValue: this.skWypadkowaPracodawca
      }
  ];
  
  }
  
  get totalEmployeePart(){
    return UmowaOPraceComponent.TOTAL_EMPLOYEE_PART;
  }
  
  get totalEmployerPart(){
    return Math.round((UmowaOPraceComponent.TOTAL_EMPLOYER_PART+this.basedParameters.accidentContributionPercent)*100)/100;
  }
  
  
  obliczKwoty(){
    if(this.checkValidation()){
      this.calculateZUSContributions();
      this.calculateHealthyContributions();
      this.calculatePPKContributions();
      this.calculateTaxContributions_2024();
      this.calculateEmplyerContributions();
      this.basedParameters.netIncome = this.dajKwoteNetto();
      this.basedParameters.totalEmployerCosts = Math.round(
        (this.basedParameters.grossIncome+
          this.razemPracodawcaZUS+
          this.ppkParameters.ppkEmployerAmount+
          this.employerContributions.fgsp+
          this.employerContributions.labourFund
          )*100)/100;
      this.calculateSummaryParameters();
      this.contributions = [
        {
          contribution: 'Emerytalne', 
          employeePart: UmowaOPraceComponent.PENSION_EMPLOYEE_PART, 
          employeeValue: this.skEmerytalnaPracownik, 
          employerPart: UmowaOPraceComponent.PENSION_EMPLOYER_PART, 
          employerValue: this.skEmerytalnaPracodawca,
        },
        {
          contribution: 'Rentowe', 
          employeePart: UmowaOPraceComponent.DISABILITY_EMPLOYEE_PART, 
          employeeValue: this.skRentowaPracownik, 
          employerPart: UmowaOPraceComponent.DISABILITY_EMPLOYER_PART, 
          employerValue: this.skRentowaPracodawca
        },
        {
          contribution: 'Chorobowe', 
          employeePart: UmowaOPraceComponent.SICKNESS_EMPLOYEE_PART, 
          employeeValue: this.skChorobowaPracownik, 
          employerPart: 0, 
          employerValue: 0
        },
        {
          contribution: 'Wypadkowe', 
          employeePart: 0, 
          employeeValue: 0, 
          employerPart: this.basedParameters.accidentContributionPercent, 
          employerValue: this.skWypadkowaPracodawca
        }
      ];
      this.months = [
        {
          month_number: 1,
          month_string: "Styczeń",
          pension_part: this.getMonthlyPensionPart(1),
          disability_part:  this.getMonthlyDisabilityPart(1)
        },
        {
          month_number: 2,
          month_string: "Luty",
          pension_part: this.getMonthlyPensionPart(2),
          disability_part: this.getMonthlyDisabilityPart(2)
        },
        {
          month_number: 3,
          month_string: "Marzec",
          pension_part: this.getMonthlyPensionPart(3),
          disability_part: this.getMonthlyDisabilityPart(3)
        },
        {
          month_number: 4,
          month_string: "Kwiecień",
          pension_part: this.getMonthlyPensionPart(4),
          disability_part: this.getMonthlyDisabilityPart(4)
        },
        {
          month_number: 5,
          month_string: "Maj",
          pension_part: this.getMonthlyPensionPart(5),
          disability_part: this.getMonthlyDisabilityPart(5)
        },
        {
          month_number: 6,
          month_string: "Czerwiec",
          pension_part: this.getMonthlyPensionPart(6),
          disability_part: this.getMonthlyDisabilityPart(6)
        },
        {
          month_number: 7,
          month_string: "Lipiec",
          pension_part: this.getMonthlyPensionPart(7),
          disability_part: this.getMonthlyDisabilityPart(7)
        },
        {
          month_number: 8,
          month_string: "Sierpień",
          pension_part: this.getMonthlyPensionPart(8),
          disability_part: this.getMonthlyDisabilityPart(8)
        },
        {
          month_number: 9,
          month_string: "Wrzesień",
          pension_part: this.getMonthlyPensionPart(9),
          disability_part: this.getMonthlyDisabilityPart(9)
        },
        {
          month_number: 10,
          month_string: "Październik",
          pension_part: this.getMonthlyPensionPart(10),
          disability_part: this.getMonthlyDisabilityPart(10)
        },
        {
          month_number: 11,
          month_string: "Listopad",
          pension_part: this.getMonthlyPensionPart(11),
          disability_part: this.getMonthlyDisabilityPart(11)
        },
        {
          month_number: 12,
          month_string: "Grudzień",
          pension_part: this.getMonthlyPensionPart(12),
          disability_part: this.getMonthlyDisabilityPart(12)
        }
      ];
    } 
  
    }
  
  dajKwoteNetto(): number {
      var kwota = this.basedParameters.grossIncome
                  -this.healthyContributions.employeeValue
                  -this.razemPracownikZUS
                  -this.ppkParameters.ppkEmployeeAmount
                  -this.taxContributions.advanceTax;
      return Math.round(kwota*100)/100; 
    }
  
  dajKwoteWolnaOdPodatku(): number {
      if(!(this.basedParameters.grossIncome > 0) || !this.basedParameters.isTaxFreeAmount){
        return 0;
      }
      else{
        return 300;
      }
    }
  
  dajKwoteKosztow(): number {
    var wyliczonaKwota: number = 0;
    if(!(this.basedParameters.grossIncome > 0)) return 0;
    if(this.basedParameters.isWorkOutsideHome){
      wyliczonaKwota = 300;
    }
    else{
      wyliczonaKwota = 250;
    }
    if(this.basedParameters.isAuthorRights){
        if((100-this.basedParameters.authorRightsPercent)*this.basedParameters.grossIncome/100 < wyliczonaKwota){
          wyliczonaKwota = (100-this.basedParameters.authorRightsPercent)*this.basedParameters.grossIncome/100;
        }
      wyliczonaKwota += (this.basedParameters.authorRightsPercent*(this.basedParameters.grossIncome-this.razemPracownikZUS))*0.5/100;
    }
    return Math.round(wyliczonaKwota*100)/100;
  }
  
  
  private obliczUlgeKlasySredniej(kwota: number, czyPPK: boolean){
    var wyliczonaUlga: number = 0;
    if(czyPPK){
      kwota = this.basedParameters.grossIncome + this.ppkParameters.ppkEmployerAmount; 
      if( kwota < 8549){
        wyliczonaUlga = (kwota*0.0668-380.5)/0.17*100;
      } else{
        wyliczonaUlga = (kwota*(-0.0735)+819.08)/0.17*100;
      }
    }else{
      if(kwota < 8549){
        wyliczonaUlga = (kwota*0.0668-380.5)/0.17*100;
      } else{
        wyliczonaUlga = (kwota*(-0.0735)+819.08)/0.17*100;
      }
    }
  
    if(wyliczonaUlga<0)
      wyliczonaUlga = 0;
   return Math.round(wyliczonaUlga)/100;
  }
  
  private obliczPodstaweOpodatkowania(){
    var wyliczonaKwota: number = 0;
    wyliczonaKwota = this.basedParameters.grossIncome 
      - this.razemPracownikZUS
      - this.taxContributions.incomeCost
      - this.taxContributions.middleClassRelief
      + this.ppkParameters.ppkEmployerAmount;
      if(wyliczonaKwota<0)
      wyliczonaKwota = 0;
      return Math.round(wyliczonaKwota);
  }
  
  private calculatePPKContributions(){
    if(this.basedParameters.isPPK){
      this.ppkParameters.ppkEmployeeAmount = Math.round(this.basedParameters.grossIncome*(this.ppkParameters.employeeContributionPercent+this.ppkParameters.addEmployeeContributionPercent))/100;
      this.ppkParameters.ppkEmployerAmount = Math.round(this.basedParameters.grossIncome*(this.ppkParameters.employerContributionPercent+this.ppkParameters.addEmployerContributionPercent))/100;
    }
    else{
      this.ppkParameters.ppkEmployeeAmount = 0;
      this.ppkParameters.ppkEmployerAmount = 0;
    }
  }
  
  private calculateHealthyContributions(){
    this.healthyContributions.baseOfHealthyContribution =  Math.round((this.basedParameters.grossIncome-this.razemPracownikZUS)*100)/100;   
    this.healthyContributions.employeeValue = Math.round((this.healthyContributions.baseOfHealthyContribution)*0.09*100)/100;
    
  }
  
  private calculateZUSContributions(){
    this.skEmerytalnaPracownik = Math.round(0.0976*this.basedParameters.grossIncome*100)/100;
    this.skChorobowaPracownik =Math.round( 0.0245*this.basedParameters.grossIncome*100)/100;
    this.skRentowaPracownik = Math.round(0.015*this.basedParameters.grossIncome*100)/100;
    this.skEmerytalnaPracodawca = Math.round(0.0976*this.basedParameters.grossIncome*100)/100;
    this.skRentowaPracodawca = Math.round(0.065*this.basedParameters.grossIncome*100)/100;
    this.skWypadkowaPracodawca = Math.round(this.basedParameters.accidentContributionPercent/100*this.basedParameters.grossIncome*100)/100;
    this.razemPracodawcaZUS = Math.round((this.skEmerytalnaPracodawca 
                          + this.skRentowaPracodawca 
                          + this.skWypadkowaPracodawca)*100)/100;
    this.razemPracownikZUS = Math.round((this.skEmerytalnaPracownik 
                          + this.skRentowaPracownik
                          + this.skChorobowaPracownik)*100)/100;
  }
  
  private calculateTaxContributions_2024(){
    this.taxContributions.taxFreeAmount = this.dajKwoteWolnaOdPodatku();
    this.taxContributions.incomeCost = this.dajKwoteKosztow();
    this.taxContributions.middleClassRelief = 0;
    this.taxContributions.baseOfTax = this.obliczPodstaweOpodatkowania();
    this.taxContributions.tax = Math.round(this.taxContributions.baseOfTax*UmowaOPraceComponent.FIRST_TAX_RATE_2022/100);
    this.taxContributions.taxFreeHealthyPart= 0;
    this.taxContributions.advanceTax = Math.round((this.taxContributions.tax - this.taxContributions.taxFreeAmount)*100)/100;
    if(this.basedParameters.isUnder26Age){
      this.taxContributions.advanceTax = 0.00;
    }
    if(this.taxContributions.advanceTax < 0){
      this.taxContributions.advanceTax = 0;
    }
  }
  
  private calculateSummaryParameters(){
    if(this.basedParameters.grossIncome > 0){
      this.summaryParameters.netIncomePercent = Math.round((this.basedParameters.netIncome/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employee.zusPercent = Math.round((this.razemPracownikZUS/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employee.nfzPercent = Math.round((this.healthyContributions.employeeValue/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employee.taxPercent = Math.round((this.taxContributions.advanceTax/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employee.ppkPercent = Math.round((this.ppkParameters.ppkEmployeeAmount/this.basedParameters.grossIncome)*10000)/100;
      
      this.summaryParameters.employer.zusPercent = Math.round((this.razemPracodawcaZUS/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employer.fgspPercent = Math.round((this.employerContributions.fgsp/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employer.labourFundPercent = Math.round((this.employerContributions.labourFund/this.basedParameters.grossIncome)*10000)/100;
      this.summaryParameters.employer.ppkPercent = Math.round((this.ppkParameters.ppkEmployerAmount/this.basedParameters.grossIncome)*10000)/100;
      
      this.summaryParameters.employerPercent = Math.round((this.basedParameters.totalEmployerCosts/this.basedParameters.grossIncome)*10000)/100;
    }
  }
  
  private calculateEmplyerContributions(){
    if(this.basedParameters.grossIncome > 0){
      this.employerContributions.fgsp = Math.round(this.basedParameters.grossIncome*0.001*100)/100;
      this.employerContributions.labourFund = Math.round(this.basedParameters.grossIncome*0.0245*100)/100;
    }
  }
  
  private checkValidation() : boolean{
    if(!(this.basedParameters.taxYear > 0 ) 
      || this.basedParameters.contractType === ''
      || this.basedParameters.grossIncome == null){
      this.errors=true;
      return false;
    }
     this.errors=false;
     return true;
  }
  
  dajRocznaKwoteSkladki(skladka :number){
    return Math.round(12*skladka*100)/100;
  }
  
  getPensionYearsPart(){
    var kwota :number = 0; 
    if(this.checkValidation()){
      this.months.forEach(element => {
        kwota += element.pension_part;
      });
    }
    return Math.round(kwota*100)/100;
  }
  
  getDisabilityYearsPart(){
    var kwota :number = 0; 
    if(this.checkValidation()){
      this.months.forEach(element => {
        kwota += element.disability_part;
      });
    }
    return Math.round(kwota*100)/100;
  }
  
  
  getMonthlyPensionPart(month_number: number){
    if(this.basedParameters.grossIncome>0){
      if(month_number*this.basedParameters.grossIncome<UmowaOPraceComponent.MAX_BASE_PENSION_PART){
        return this.skEmerytalnaPracownik;
      }
      else{
        if(month_number*this.basedParameters.grossIncome-UmowaOPraceComponent.MAX_BASE_PENSION_PART<this.basedParameters.grossIncome){
          return Math.round(UmowaOPraceComponent.PENSION_EMPLOYEE_PART*(month_number*this.basedParameters.grossIncome-UmowaOPraceComponent.MAX_BASE_PENSION_PART))/100;
        }
        else{
          return 0;
        }
      }
    }
    return 0;
  }
  
  getMonthlyDisabilityPart(month_number: number){
    if(this.basedParameters.grossIncome>0){
      if(month_number*this.basedParameters.grossIncome<UmowaOPraceComponent.MAX_BASE_PENSION_PART){
        return this.skRentowaPracownik;
      }
      else{
        if(month_number*this.basedParameters.grossIncome-UmowaOPraceComponent.MAX_BASE_PENSION_PART<this.basedParameters.grossIncome){
          return Math.round(UmowaOPraceComponent.DISABILITY_EMPLOYEE_PART*(month_number*this.basedParameters.grossIncome-UmowaOPraceComponent.MAX_BASE_PENSION_PART))/100;
        }
        else{
          return 0;
        }
      }
    }
    return 0;
  }
  
}
