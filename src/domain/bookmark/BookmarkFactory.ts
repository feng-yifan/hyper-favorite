import Bookmark from '@domain/bookmark/Bookmark.ts';
import { TEntityFactory } from '@typing.ts';

export default class BookmarkFactory {
  public build(params: TEntityFactory<Bookmark>) {
    const bookmark = new Bookmark();
    bookmark.name = params.name;
    bookmark.path = params.path;
    bookmark.fullPath = params.fullPath;
    bookmark.tags = params.tags;
    if (params.id) {
      bookmark.id = params.id;
      bookmark.createdAt = params.createdAt!;
      bookmark.updatedAt = params.updatedAt!;
    }
    return bookmark;
  }
}
