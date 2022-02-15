import { Component, OnInit } from '@angular/core';
import { CalculatorComponent } from '../../calculator.component';

@Component({
  selector: 'app-uop-summary',
  templateUrl: './uop-summary.component.html',
  styleUrls: ['./uop-summary.component.css']
})
export class UopSummaryComponent implements OnInit {

  skEmerytalnaPracownik: number= 0;
  skRentowaPracownik: number= 0;
  skRentowaPracodawca: number= 0;
  skChorobowaPracownik: number= 0;
  skEmerytalnaPracodawca: number= 0;
  skWypadkowaPracodawca: number= 0;
  razemPracodawcaZUS: number =0;
  razemPracownikZUS: number= 0;

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
    employeePart: CalculatorComponent.HEALTHY_EMPLOYEE_PART, 
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
    zusPercent: 0,
    nfzPercent: 0,
    ppkPercent: 0,
    taxPercent: 0,
    netIncomePercent: 0,
    employerPercent: 0
  }

  constructor() { }

  ngOnInit(): void {
  }



}
