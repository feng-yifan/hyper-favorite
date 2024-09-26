import AppDB from '@framework/database/AppDB.ts';

export default abstract class Repository {
  protected readonly db;
  constructor() {
    this.db = new AppDB();
  }
}
