import Bookmark from '@domain/bookmark/Bookmark.ts';
import Repository from '@framework/abstract/Repository.ts';
import { TDBSchemaTagBookmark, TTagBookmarkEditable } from '@typing.ts';

export default class TagBookmarkRepository extends Repository {
  constructor() {
    super();
  }

  public async create(params: TTagBookmarkEditable) {
    return await this.db.tagBookmarks.add(params as TDBSchemaTagBookmark);
  }

  public async deleteByBookmarkId(id: Bookmark['id']) {
    return await this.db.tagBookmarks.where('bookmarkId').equals(id).delete();
  }
}
