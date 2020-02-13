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

  /**
   * Haalt value op uit localstorage doormiddel van een key
   * @param {string} key
   * @returns {Object}
   */
  get(key) {
    return this.store[key];
  }

  /**
   * Slaat key value pair op in de localstorage
   * @param key
   * @param value
   */
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
