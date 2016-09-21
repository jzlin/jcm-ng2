import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pharmacy } from './pharmacy';

@Injectable()
export class HealthService {

  constructor(private _http: Http) { }

  getPharmacy(): Observable<Pharmacy[]> {
    const url = 'https://data.gov.uk/data/api/service/health/pharmacies/partial_postcode?partial_postcode=TW8';
    return this._http
      .get(url)
      .map((r: Response) => {
        return r.json().result as Pharmacy[];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred', error);
    return new Observable(observer => {
      observer.error(error.message || error)
    });
  }

}
