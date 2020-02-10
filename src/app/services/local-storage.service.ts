import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private store: {
    [key: string]: string
  } = {};

  constructor() {
    this.loadStore();
  }

  get(key) {
    return this.store[key];
  }

  set(key,value) {
    this.store[key] = value;
  }

  loadStore(){
    try {

    }catch (e) {

    }
    if (!this.store) {
      this.store = {};
      this.saveInStore();
    }
  }

  saveInStore() {
    localStorage.setItem('store', JSON.stringify(this.store));
  }
}
