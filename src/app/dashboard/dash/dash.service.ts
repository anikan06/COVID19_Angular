import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  constructor() { }

  sortArrayOfObjects = (arr, key) => {
    return arr.sort((a, b) => {
      return b[key] - a[key];
    });
  }
}
