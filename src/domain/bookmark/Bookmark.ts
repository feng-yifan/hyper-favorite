import Tag from '@domain/tag/Tag.ts';
import Entity from '@framework/abstract/Entity.ts';
import EntityRepository from '@framework/abstract/EntityRepository.ts';
import BookmarkRepository from '@repository/BookmarkRepository.ts';
import { TBookmarkEditable, TDBSchemaBookmark } from '@typing.ts';

export default class Bookmark extends Entity implements TDBSchemaBookmark {
  name!: string;
  path!: string;
  fullPath!: string;
  tags!: Tag[];

  public table = 'bookmarks' as const;
  public editable: (keyof TBookmarkEditable)[] = ['name', 'path', 'fullPath', 'tags'];
  protected repository: EntityRepository;

  constructor() {
    super();
    this.repository = new BookmarkRepository();
  }

  public update(params: Partial<TBookmarkEditable>) {
    let key: keyof TBookmarkEditable;
    for (key in params) {
      // @ts-ignore
      this[key] = params[key];
    }
  }
}
