import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dzialanosc',
  templateUrl: './dzialanosc.component.html',
  styleUrls: ['./dzialanosc.component.css']
})
export class DzialanoscComponent implements OnInit {


  skladkiZUS = [
  {
    id: "1",
    value: "Ulga na start"
  },
  {
    id: "2",
    value: "Mały ZUS"
  },
  {
    id: "3",
    value: "Mały ZUS plus"
  },
  {
    id: "4",
    value: "Pełny ZUS"
  }
  ];

  taxType=[ 'Skala podatkowa 17% / 32%',
            'Podatek liniowy 19%',
            'Ryczałt'
  ];

  ryczalt=['8.5%','12%','15%','17%'];

  tax: any = null;
  selectedCategory: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
