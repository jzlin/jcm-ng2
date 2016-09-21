import { Component, OnInit } from '@angular/core';

import { HealthService } from '../shared/health.service';
import { Pharmacy } from './../shared/pharmacy';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.component.html',
  styleUrls: ['./demo1.component.scss'],
  providers: [
    HealthService
  ]
})
export class Demo1Component implements OnInit {

  pharmacies: Pharmacy[];
  address = '';

  constructor(private _healthSvc: HealthService) { }

  ngOnInit() {
    this.loadPharmacies();
  }

  private loadPharmacies() {
    this._healthSvc
      .getPharmacy()
      .subscribe((data: Pharmacy[]) => {
        console.log(data);
        this.pharmacies = data;
        if (this.pharmacies.length > 0) {
          this.changePharmacy(this.pharmacies[0].organisation_id);
        }
      }, (error) => {
        console.log(error);
      });
  }

  changePharmacy(pharmacyId) {
    this.address = '';
    let pharmacy = this.pharmacies.find(p => p.organisation_id === pharmacyId);
    if (pharmacy) {
      let keys = ['address1', 'address2', 'address3', 'city', 'postcode'];
      let values = keys.map(key => pharmacy[key]);
      this.address = values.filter(value => !!value).join(', ');
    }
  }

}
