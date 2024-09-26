import { TEntity, TEntityName } from '@typing.ts';

export default abstract class Entity implements TEntity {
  public id!: number;
  public createdAt!: number;
  public updatedAt!: number;
  public table!: TEntityName;
  public editable!: string[];
}
