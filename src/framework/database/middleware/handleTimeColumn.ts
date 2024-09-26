import { hasCreatedAt, hasUpdatedAt } from '@framework/database/tableColumns.ts';
import { TDBSchemaName } from '@typing.ts';
import { DBCore, DBCoreMutateRequest, Middleware } from 'dexie';

const handleTimeColumn: Middleware<DBCore> = {
  stack: 'dbcore',
  name: 'handleTimeColumn',
  create(down) {
    return {
      ...down,
      table(tableName) {
        const downTable = down.table(tableName);
        return {
          ...downTable,
          mutate: req => {
            const newReq: DBCoreMutateRequest = {...req};
            // 创建时自动附加时间字段
            if (newReq.type === 'add') {
              const timestamp = Date.now();
              newReq.values = newReq.values.map(value => {
                if (hasCreatedAt(tableName as TDBSchemaName)) {
                  value.createdAt = timestamp;
                }
                if (hasUpdatedAt(tableName as TDBSchemaName)) {
                  value.updatedAt = timestamp;
                }
                return value;
              });
            }
            // 修改时自动更新 updatedAt 字段
            if (newReq.type === 'put') {
              const timestamp = Date.now();
              newReq.values = newReq.values.map(value => {
                if (hasUpdatedAt(tableName as TDBSchemaName)) {
                  value.updatedAt = timestamp;
                }
                return value;
              });
            }
            return downTable.mutate(newReq);
          },
        };
      },
    };
  },
};

export default handleTimeColumn;
