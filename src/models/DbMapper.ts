export interface DbMapper<T, D = any> {
  toDb(entity: T): D;
  fromDb(row: D): T;
}
