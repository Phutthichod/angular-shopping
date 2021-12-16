import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() { }
  createDb() {
    return {
      players: [
        {
          id: 1,
          name: 'Messi',
          value: 400
        },
        {
          id: 2,
          name: 'Ronaldo',
          value: 800
        },
        {
          id: 3,
          name: 'Rooney',
          value:  300
        }
      ]
    };
  }
}