import Bookmark from '@domain/bookmark/Bookmark.ts';
import db from '@framework/database/db.ts';
import BookmarkRepository from '@repository/BookmarkRepository.ts';
import TagBookmarkRepository from '@repository/TagBookmarkRepository.ts';

export default class UpdateBookmarkService {
  private readonly bookmarkRepository;
  private readonly tagBookmarkRepository;
  constructor() {
    this.bookmarkRepository = new BookmarkRepository();
    this.tagBookmarkRepository = new TagBookmarkRepository();
  }
  public async handle(bookmark: Bookmark) {
    await db.transaction('rw', db.bookmarks, db.tagBookmarks, async () => {
      await this.bookmarkRepository.save(bookmark);
      await this.tagBookmarkRepository.deleteByBookmarkId(bookmark.id);
      for (const tag of bookmark.tags) {
        await this.tagBookmarkRepository.create({tagId: tag.id, bookmarkId: bookmark.id});
      }
    });
  }
}
