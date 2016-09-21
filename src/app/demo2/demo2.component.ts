import { Component, OnInit } from '@angular/core';

import { Gender } from './../shared/gender';
import { Percentage } from './../shared/percentage';
import { Record } from './../shared/record';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.scss']
})
export class Demo2Component implements OnInit {

  genderList: Gender[] = [
    {
      name: 'Male',
      value: 'male'
    },
    {
      name: 'Female',
      value: 'female'
    }
  ];

  percentageList: Percentage[] = [
    {
      name: '0%',
      value: 0
    },
    {
      name: '10%',
      value: 10
    },
    {
      name: '20%',
      value: 20
    },
    {
      name: '30%',
      value: 30
    },
    {
      name: '40%',
      value: 40
    },
    {
      name: '50%',
      value: 50
    },
    {
      name: '60%',
      value: 60
    },
    {
      name: '70%',
      value: 70
    },
    {
      name: '80%',
      value: 80
    },
    {
      name: '90%',
      value: 90
    },
    {
      name: '100%',
      value: 100
    }
  ];

  genderSelectList: Gender[];
  percentageSelectList: Percentage[];

  itemList: Record[] = [];

  constructor() { }

  ngOnInit() {
    this.updateSelectList();
  }

  addItem(genderVal, percentageVal) {
    let gender = this.genderSelectList.find(g => g.value === genderVal);
    let percentage = this.percentageSelectList.find(p => p.value === parseInt(percentageVal));

    if (!gender) {
      console.error(`can find gender value ${genderVal} in genderSelectList!`)
      alert('please choose a gender');
      return;
    }

    if (!percentage) {
      console.error(`can find percentage value ${percentageVal} in percentageSelectList!`)
      alert('please choose a percentage');
      return;
    }

    this.itemList.push({
      gender: gender,
      percentage: percentage
    });

    this.updateSelectList();
  }

  removeItem(index) {
    this.itemList.splice(index, 1);

    this.updateSelectList();
  }

  updateSelectList() {
    this.genderSelectList = this.genderList.filter(
      gender => !this.itemList.find(
        item => item.gender.value === gender.value
      )
    );

    this.percentageSelectList = this.percentageList.filter(
      percentage => this.itemList.length === 0 ||
        percentage.value <= 100 - this.itemList.reduce(
        (previousValue, currentValue, currentIndex, array) => {
          return previousValue + currentValue.percentage.value;
        }, 0)
    );
  }

}
