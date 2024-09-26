import Bookmark from '@domain/bookmark/Bookmark.ts';
import BookmarkFactory from '@domain/bookmark/BookmarkFactory.ts';
import EntityRepository from '@framework/abstract/EntityRepository.ts';
import { TDBSchemaBookmark } from '@typing.ts';

export default class BookmarkRepository extends EntityRepository {
  constructor() {
    super();
  }

  public async getByFullPath(fullPath: TDBSchemaBookmark['fullPath']) {
    const bookmark = await this.db
      .bookmarks
      .where('fullPath')
      .equals(fullPath)
      .first() as Bookmark | undefined;
    if (!bookmark) {
      return undefined;
    }
    return new BookmarkFactory().build(bookmark);
  }

  public async getById(id: Bookmark['id']) {
    return await this.getByTableNameAndId('bookmarks', id) as TDBSchemaBookmark | undefined;
  }
}
