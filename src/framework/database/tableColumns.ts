import { TDBSchemaName, TDBSchemas } from '@typing.ts';

const tableColumns: {
  [TableName in TDBSchemaName]: Array<keyof TDBSchemas[TableName]>
} = {
  tags: ['id', 'name', 'fullName', 'level', 'left', 'right', 'parentId', 'createdAt', 'updatedAt'],
  bookmarks: ['id', 'path', 'fullPath', 'tags', 'createdAt', 'updatedAt'],
  tagBookmarks: ['tagId', 'bookmarkId', 'createdAt'],
};

export default tableColumns;
export const hasColumn = (tableName: TDBSchemaName, column: string) => {
  // @ts-ignore
  return tableColumns[tableName].includes(column);
};
export const hasCreatedAt = (tableName: TDBSchemaName) => hasColumn(tableName, 'createdAt');
export const hasUpdatedAt = (tableName: TDBSchemaName) => hasColumn(tableName, 'updatedAt');
