import handleTimeColumn from '@framework/db/middleware/handleTimeColumn.ts';
import Dexie, { EntityTable, Table } from "dexie";
import TBookmark = schema.bookmark.TBookmark;
import TTag = schema.bookmark.TTableTag;
import TTagBookmark = schema.bookmark.TTagBookmark;
import TPrimaryKeyKey = schema.TPrimaryKeyKey;
import TWithoutTimeColumn = schema.TWithoutTimeColumn;

const bookmark = new Dexie('bookmark') as Dexie & {
  tags: EntityTable<TWithoutTimeColumn<TTag>, TPrimaryKeyKey>
  bookmarks: EntityTable<TWithoutTimeColumn<TBookmark>, TPrimaryKeyKey>
  tagBookmarks: Table<TWithoutTimeColumn<TTagBookmark>>
};

bookmark.version(1).stores({
  tags: '++id, name, &fullName, level, &left, &right, parentId, [level+left+right]',
  bookmarks: '++id, path, &fullPath',
  tagBookmarks: '[tagId+bookmarkId], tagId, bookmarkId',
});

bookmark.use(handleTimeColumn);

const db = {
  bookmark,
};

export default db;
