import Bookmark from '@domain/bookmark/Bookmark.ts';
import BookmarkFactory from '@domain/bookmark/BookmarkFactory.ts';
import db from '@framework/database/db.ts';
import BookmarkRepository from '@repository/BookmarkRepository.ts';
import TagBookmarkRepository from '@repository/TagBookmarkRepository.ts';
import { TEntityFactory } from '@typing.ts';

export default class CreateBookmarkService {
  private readonly bookmarkRepository;
  private readonly tagBookmarkRepository;
  constructor() {
    this.bookmarkRepository = new BookmarkRepository();
    this.tagBookmarkRepository = new TagBookmarkRepository();
  }

  public async handle(params: TEntityFactory<Bookmark>) {
    return db.transaction('rw', db.bookmarks, db.tagBookmarks, async () => {
      const bookmark = new BookmarkFactory().build(params);
      await this.bookmarkRepository.save(bookmark);
      for (const tag of bookmark.tags) {
        await this.tagBookmarkRepository.create({tagId: tag.id!, bookmarkId: bookmark.id!});
      }
      return bookmark;
    });
  }
}
