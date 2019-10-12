import Dexie from 'dexie';

export class DexieService extends Dexie {

  constructor() {

    super('AppDatabase');
    
    this.version(1).stores({
        users: '++id,username,email',
    });
  }
}