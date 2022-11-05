import { Component} from '@angular/core';
import { UmowaOPraceComponent } from '../calculator/umowa-oprace/umowa-oprace.component'

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent{

contractsType: any[];

contributions: any[] = [];


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


taxContributions = {
  incomeCost: 0,
  middleClassRelief: 0,
  baseOfTax: 0,
  tax: 0,
  taxFreeAmount: 0, 
  taxFreeHealthyPart: 0,
  advanceTax: 0 
};



constructor(){
  this.contractsType = ['Umowa o Pracę', 'Działalnośc Gospodarcza'];
 }
}

