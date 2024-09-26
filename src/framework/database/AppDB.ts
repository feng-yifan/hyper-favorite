import Bookmark from '@domain/bookmark/Bookmark.ts';
import Tag from '@domain/tag/Tag.ts';
import handleTimeColumn from '@framework/database/middleware/handleTimeColumn.ts';
import { TDBSchemaBookmark, TDBSchemaPK, TDBSchemaTag, TDBSchemaTagBookmark } from '@typing.ts';
import Dexie, { EntityTable, Table } from 'dexie';

export default class AppDB extends Dexie {
  tags!: EntityTable<TDBSchemaTag, keyof TDBSchemaPK>;
  bookmarks!: EntityTable<TDBSchemaBookmark, keyof TDBSchemaPK>;
  tagBookmarks!: Table<TDBSchemaTagBookmark>;

  constructor() {
    super('Bookmarks', {addons: []});
    this.version(1).stores({
      tags: '++id,&fullName,&left,&right,[level+left+right]',
      bookmarks: '++id,path,&fullPath',
      tagBookmarks: '[tagId+bookmarkId],tagId,bookmarkId',
    });
    this.use(handleTimeColumn);
    this.tags.mapToClass(Tag);
    this.bookmarks.mapToClass(Bookmark);
  }
}
