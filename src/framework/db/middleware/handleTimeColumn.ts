import { DBCore, DBCoreMutateRequest, Middleware } from 'dexie';

const handleTimeColumn: Middleware<DBCore> = {
  stack: 'dbcore',
  name: 'handleTimeColumn',
  create(down) {
    return {
      ...down,
      table(name) {
        const downTable = down.table(name);
        return {
          ...downTable,
          mutate: req => {
            const newReq: DBCoreMutateRequest = {...req};
            // 创建时自动附加时间字段
            if (newReq.type === 'add') {
              const timestamp = Date.now();
              newReq.values = newReq.values.map(value => ({
                ...value,
                createdAt: timestamp,
                updatedAt: timestamp,
              }));
            }
            // 修改时自动更新 updatedAt 字段
            if (newReq.type === 'put') {
              const timestamp = Date.now();
              newReq.values = newReq.values.map(value => ({
                ...value,
                updatedAt: timestamp,
              }));
            }
            return downTable.mutate(newReq);
          },
        };
      },
    };
  },
};

export default handleTimeColumn;
