import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  // constructor() { }

  private readonly _HttpClient= inject(HttpClient);

  baseUrl:string='https://ecommerce.routemisr.com';


  getAllBrands():Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/brands`)
  }
  // @Injectable({
  //   providedIn: 'root'
  // })
}


