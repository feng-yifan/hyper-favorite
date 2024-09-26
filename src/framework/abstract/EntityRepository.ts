import Entity from '@framework/abstract/Entity.ts';
import Repository from '@framework/abstract/Repository.ts';
import { TDBSchemaName, TEntityName } from '@typing.ts';

export default abstract class EntityRepository extends Repository {

  /**
   * 保存具有 ID 的实体
   * @param entity
   */
  private async edite(entity: Entity) {
    return await this.db[entity.table as TEntityName]
      .where('id')
      .equals(entity.id!)
      // @ts-ignore
      .modify(origin => {
        Object.keys(origin).forEach((key) => {
          origin[key] = entity[key as keyof Entity];
        });
      });
  }

  /**
   * 根据实体创建对象
   * @param entity
   */
  private async create(entity: Entity) {
    const value: Record<string, any> = {};
    entity.editable.forEach(key => {
      value[key] = entity[key as keyof Entity];
    });
    // @ts-ignore
    return await this.db[entity.table as TDBSchemaName].add(value);
  }

  public async save(entity: Entity) {
    let id = entity.id;
    if (id) {
      await this.edite(entity);
    } else {
      id = await this.create(entity);
    }
    const entityInDb = await this.getByTableNameAndId(entity.table, id);
    entity.id = id;
    entity.createdAt = entityInDb!.createdAt;
    entity.updatedAt = entityInDb!.updatedAt;
  }

  public async getByTableNameAndId(tableName: TEntityName, id: number) {
    return await this.db[tableName].where('id').equals(id).first();
  }
}
